import { Chain } from 'src/constants'
import { FinalityState } from '@hop-protocol/core/config'
import { HopChainFinalityStrategy } from './HopChainFinalityStrategy'
import { IFinalityStrategy } from '../IFinalityStrategy'
import { providers } from 'ethers'

export class HopGnosisFinalityStrategy extends HopChainFinalityStrategy implements IFinalityStrategy {
  constructor (provider: providers.Provider) {
    super(provider, Chain.Gnosis)
  }

  getBlockNumber = async (): Promise<number> => {
    return this.provider.getBlockNumber()
  }

  getSafeBlockNumber = async (): Promise<number> => {
    const block = await this.provider.getBlock(FinalityState.Safe)
    return Number(block.number)
  }

  getFinalizedBlockNumber = async (): Promise<number> => {
    const block = await this.provider.getBlock(FinalityState.Finalized)
    return Number(block.number)
  }

  getSyncHeadBlockNumber = async (): Promise<number> => {
    const blockNumber: number = await this.provider.getBlockNumber()
    const syncHeadConfirmations = 12
    return blockNumber - syncHeadConfirmations
  }
}
