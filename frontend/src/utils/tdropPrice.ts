import { Contract, ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { getCurrentPrice } from './price'

import { abi as IUniswapV2Pair } from '../sdk/IUniswapV2Pair.json'

export const estimateTDROPPrice = async () => {
  const tfuelPrice = await getCurrentPrice('TFUEL')

  const tfuelTDROPPair = new Contract(
    '0xf5f0bd8ad98fd38306ec16608aa9f4e6bcff5a93',
    IUniswapV2Pair,
    new ethers.providers.JsonRpcProvider('https://eth-rpc-api.thetatoken.org/rpc ', {
      name: 'theta mainnet',
      chainId: 361,
    }),
  )
  const { reserve0, reserve1 } = await tfuelTDROPPair.getReserves()

  const price = new BigNumber(tfuelPrice).times(reserve0.toString()).div(reserve1.toString()).toNumber()

  console.log('est. TDROP price: ', price)
  return price
}
