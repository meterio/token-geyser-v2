import { Contract, ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { getCurrentPrice } from './price'

import { abi as IUniswapV2Pair } from '../sdk/IUniswapV2Pair.json'


export const estimateVoltPrice = async () => {
 

  const mtrgPrice = await getCurrentPrice('MTRG')
  const mtrgVoltPair = new Contract('0x1071392e4cdf7c01d433b87be92beb1f8fd663a8', IUniswapV2Pair, new ethers.providers.JsonRpcProvider('https://rpc.meter.io', { name: 'meter mainnet', chainId: 82 }))
  const { reserve0, reserve1 } = await mtrgVoltPair.getReserves()
 
  const price = new BigNumber(mtrgPrice).times(reserve0.toString()).div(reserve1.toString()).toNumber()
 
  console.log('est. VOLT price: ', price)
  return price
}
