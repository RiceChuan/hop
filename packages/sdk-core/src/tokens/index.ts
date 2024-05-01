import type { Token } from './types.js'
import { TokenSymbol } from './types.js'
import { _getToken } from './utils/internal.js'

/**
 * Types and utils
 */

export type { Token }
export { TokenSymbol }
export * from './utils/index.js'


/**
 * Main methods to be consumed
 */

export const getToken = (symbol: TokenSymbol): Token => {
  return _getToken(symbol)
}

export const getTokens = (): Token[] => {
  return Object.values(TokenSymbol).map(tokenSymbol => getToken(tokenSymbol))
}
