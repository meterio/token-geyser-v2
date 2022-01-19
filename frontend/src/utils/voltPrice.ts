import { Contract, ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { getCurrentPrice } from './price'

import { abi as IUniswapV2Pair } from '../sdk/IUniswapV2Pair.json'


export const estimateVoltPrice = async () => {
 

  const tfuelPrice = await getCurrentPrice('GLMR')
 
  const tfuelVoltPair = new Contract('0x17507b7753b106369f6855c7a8cbddee19e8e464', IUniswapV2Pair, new ethers.providers.JsonRpcProvider('https://moonbeam.api.onfinality.io/public', { name: 'Moonbeam ', chainId: 1284 }))
  const { reserve0, reserve1 } = await tfuelVoltPair.getReserves()
 
  const price = new BigNumber(tfuelPrice).times(reserve0.toString()).div(reserve1.toString()).toNumber()
 
  console.log('est. VOLT price: ', price)
  return price
}
