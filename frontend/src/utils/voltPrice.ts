import { Contract } from 'ethers'
import BigNumber from 'bignumber.js'
import { getCurrentPrice } from './price'
import { SignerOrProvider } from '../types'
import { abi as IUniswapV2Pair } from '../sdk/IUniswapV2Pair.json'

export const estimateVoltPrice = async (signerOrProvider: SignerOrProvider) => {
 
  const mtrgPrice = await getCurrentPrice('MTRG')
  const mtrgVoltPair = new Contract('0xbd346458ad37f2d3101ede54cb411d2636decbc6', IUniswapV2Pair, signerOrProvider)
  const { reserve0, reserve1 } = await mtrgVoltPair.getReserves()
  // console.log(
  //   'estimate VOLT price, MTRG price: ',
  //   mtrgPrice,
  //   ', MTRG amount:',
  //   new BigNumber(reserve0.toString()).div(1e18).toFixed(4),
  //   ', VOLT amount: ',
  //   new BigNumber(reserve1.toString()).div(1e18).toFixed(4),
  // )
  const price = new BigNumber(mtrgPrice).times(reserve0.toString()).div(reserve1.toString()).toNumber()
 
  console.log('est. VOLT price: ', price)
  return price
}
