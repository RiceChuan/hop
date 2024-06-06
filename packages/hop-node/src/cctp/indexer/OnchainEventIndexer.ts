import { EventEmitter } from 'node:events'
import { OnchainEventIndexerDB } from '#cctp/db/OnchainEventIndexerDB.js'
import type { LogWithChainId, RequiredFilter, TypedLogWithChainId } from '../types.js'
import { getRpcProvider } from '#utils/getRpcProvider.js'
import { poll } from '../utils.js'
import { providers } from 'ethers'
import {
  DATA_INDEXED_EVENT,
  POLL_INTERVAL_MS
} from './constants.js'
import { getMaxBlockRangePerIndex, getUniqueFilterId } from './utils.js'
import { IOnchainEventIndexer } from './IOnchainEventIndexer.js'
import { getChain } from '@hop-protocol/sdk'

/**
 * Onchain event indexer. A single instance of this class is responsible for
 * indexing as many events as needed.
 *
 * Formats data into a filterId for use by the DB. The filterId is a unique
 * identifier for the event and is used to store and retrieve indexed data.
 *
 * The DB is not concerned with the specifics of the event, only the filterId.
 *
 * @dev The consumer should call addIndexer() for all indexers they want
 * to use before calling init() and start().
 */

export interface IndexerEventFilter<T extends string[] = string[]> {
  chainId: string
  eventSig: string
  eventContractAddress: string
  indexTopicNames: T
}

interface EventLogsForRange {
  chainId: string
  eventSig: string
  eventContractAddress: string
  startBlockNumber: number
  endBlockNumber: number
}

export abstract class OnchainEventIndexer<T, U> implements IOnchainEventIndexer<T, U> {
  readonly #eventEmitter: EventEmitter = new EventEmitter()
  readonly #db: OnchainEventIndexerDB
  readonly #indexerEventFilters: IndexerEventFilter[] = []
  readonly #pollIntervalMs: number = POLL_INTERVAL_MS
  #started: boolean = false

  abstract retrieveItem(key: T, value: U): Promise<TypedLogWithChainId>
  protected abstract getIndexerEventFilter(chainId: string, key: T): IndexerEventFilter

  constructor (dbName: string) {
    this.#db = new OnchainEventIndexerDB(dbName)
  }

  protected addIndexerEventFilter (indexerEventFilter: IndexerEventFilter): void {
    if (this.#started) {
      throw new Error('Cannot add indexer after starting')
    }
    const filterId = getUniqueFilterId(indexerEventFilter)
    this.#db.newIndexerDB(filterId)
    this.#indexerEventFilters.push(indexerEventFilter)
  }

  /**
   * Initialization
   */

  async init (): Promise<void> {
    for (const indexerEventFilter of this.#indexerEventFilters) {
      const { chainId } =indexerEventFilter 
      const filterId = getUniqueFilterId(indexerEventFilter)
      await this.#db.initializeIndexer(filterId, chainId)
    }
    console.log('OnchainEventIndexer initialized')
  }

  start (): void {
    this.#startListeners()
    for (const indexerEventFilter of this.#indexerEventFilters) {
      this.#startPoller(indexerEventFilter)
    }
    this.#started = true
    console.log('OnchainEventIndexer started')
  }

  /**
   * Node events
   */

  #startListeners = (): void => {
    // Emit event when data is written to the DB
    // https://github.com/Level/abstract-level?tab=readme-ov-file#write
    this.#db.on('write', (operations: any) => {
      for (const op of operations) {
        if (op.type !== 'put') continue
        // TODO: This should be cleaned up.
        const isTypedLog = MessageSDK.isTypedLog(op.value)
        if (!isTypedLog) continue

        // TODO: Parsing should not be async. If it is, this should be handled better.
        MessageSDK.getTypedLog(op.value).then((parsedLog: any) => {
          this.#eventEmitter.emit(DATA_INDEXED_EVENT, parsedLog)
        })
      }
    })
    this.#db.on('error', () => { throw new Error('Onchain event indexer error') })
  }

  on (event: string, listener: (...args: any[]) => void): void {
    this.#eventEmitter.on(event, listener)
  }

  /**
   * Getters
   */

  protected async retrieveIndexedItem(indexerEventFilter: IndexerEventFilter, indexValues: string[]): Promise<TypedLogWithChainId> {
    const filterId = getUniqueFilterId(indexerEventFilter)
    const dbLog = await this.#db.getIndexedItem(filterId, indexValues)
    // TODO: Not any
    const parsedLog: any = await MessageSDK.getTypedLog(dbLog)
    return { ...dbLog, typedData: parsedLog }
  }

  /**
   * Poller
   */

  #startPoller (indexerEventFilter: IndexerEventFilter): void {
    poll(() => this.#syncEvents(indexerEventFilter), this.#pollIntervalMs)
  }

  #syncEvents = async (indexerEventFilter: IndexerEventFilter): Promise<void> => {
    const { chainId, eventSig, eventContractAddress, indexTopicNames } = indexerEventFilter
    const filterId = getUniqueFilterId(indexerEventFilter)
    const lastBlockSynced = await this.#db.getLastBlockSynced(filterId)
    const chainSlug = getChain(chainId).slug
    const provider = getRpcProvider(chainSlug)

    // Add 1 to currentEnd to avoid fetching the same block twice
    const startBlockNumber = lastBlockSynced + 1
    const endBlockNumber = await provider.getBlockNumber()
    const isSynced = startBlockNumber > endBlockNumber
    if (isSynced) return

    const getEventLogsInput: EventLogsForRange = {
      chainId,
      eventSig,
      eventContractAddress,
      startBlockNumber,
      endBlockNumber
    }

    for await (const { endBlockNumber, logs } of this.#getEventLogsForRange(getEventLogsInput)) {
      // Storing the parsed values would be redundant since their raw form is already in the log.
      // Since the parsed values are needed as an index, we pass those in explicitly.
      const indexValues: string[][] = []
      for (const log of logs) {
        const parsedLog: any = await MessageSDK.getTypedLog(log)
        const values = indexTopicNames.map(indexTopicName => parsedLog[indexTopicName])
        indexValues.push(values)
      }

      // Atomically write new DB state and logs to avoid out of sync state
      // Note: There can be an updated lastBlockSynced even if the logs are empty, so don't skip the update
      await this.#db.putItemWithIndex(filterId, endBlockNumber, logs, indexValues)
    }
  }

  /**
   * Indexer
   */

  // TODO: General logs, not any. I add chainId at a later time
  async *#getEventLogsForRange (input: EventLogsForRange): AsyncIterable<{
    endBlockNumber: number,
    logs: LogWithChainId[]
  }> {
    const { chainId, eventSig, eventContractAddress, startBlockNumber, endBlockNumber } = input
    if (startBlockNumber > endBlockNumber) {
      throw new Error('startBlockNumber must be less than or equal to endBlockNumber')
    }

    const chainSlug = getChain(chainId).slug
    const provider = getRpcProvider(chainSlug)
    const maxBlockRange = getMaxBlockRangePerIndex(chainId)

    // Fetch logs in chunks
    let currentStartBlockNumber: number = startBlockNumber
    while (currentStartBlockNumber <= endBlockNumber) {
      const currentEndBlockNumber = Math.min(currentStartBlockNumber + maxBlockRange, endBlockNumber)

      const filter: RequiredFilter = {
        topics: [eventSig],
        address: eventContractAddress,
        fromBlock: currentStartBlockNumber,
        toBlock: currentEndBlockNumber 
      }

      // TODO: From SDK with typedData
      const logs: providers.Log[] = await provider.getLogs(filter)
      const logsWithChainId: LogWithChainId[] = logs.map(log => ({ ...log, chainId }))

      yield  {
        endBlockNumber: currentEndBlockNumber,
        logs: logsWithChainId
      }

      currentStartBlockNumber = currentEndBlockNumber + 1
    }
  }
}