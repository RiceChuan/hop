import { BigNumber } from 'ethers'

function bnMax (a: BigNumber, b: BigNumber) {
  if (!a) {
    return b
  }
  if (!b) {
    return a
  }
  return a?.gt(b) ? a : b
}

export default bnMax 
