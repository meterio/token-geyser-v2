import { Contract, ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { getCurrentPrice } from './price'

import { abi as IUniswapV2Pair } from '../sdk/IUniswapV2Pair.json'


export const estimateVoltPrice = async () => {
 

  const tfuelPrice = await getCurrentPrice('TFUEL')
 
  const tfuelVoltPair = new Contract('0x904a21bbce765c4771f7e139e19487b618c0da4d', IUniswapV2Pair, new ethers.providers.JsonRpcProvider('https://eth-rpc-api.thetatoken.org/rpc ', { name: 'theta mainnet', chainId: 361 }))
  const { reserve0, reserve1 } = await tfuelVoltPair.getReserves()
 
  const price = new BigNumber(tfuelPrice).times(reserve0.toString()).div(reserve1.toString()).toNumber()
 
  console.log('est. VOLT price: ', price)
  return price
}
