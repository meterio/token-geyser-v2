import CGApi from 'coingecko-api'
import { Contract, ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import * as ls from './cache'

import { abi as IUniswapV2Pair } from '../sdk/IUniswapV2Pair.json'

const MS_PER_SEC = 1000

export const MIN_IN_SEC = 60
export const HOUR_IN_SEC = 60 * MIN_IN_SEC
export const DAY_IN_SEC = 24 * HOUR_IN_SEC
export const WEEK_IN_SEC = 7 * DAY_IN_SEC
export const MONTH_IN_SEC = 30 * DAY_IN_SEC
export const YEAR_IN_SEC = 365 * DAY_IN_SEC

export const MIN_IN_MS = MIN_IN_SEC * MS_PER_SEC
export const HOUR_IN_MS = HOUR_IN_SEC * MS_PER_SEC
export const FIVE_MIN_IN_MS = 5 * MIN_IN_MS * MS_PER_SEC

const TTL = FIVE_MIN_IN_MS
interface Coin {
  id: string
  price: number
}

const symbolMap: { [key: string]: Coin } = {
  // voltswap supported
  WBTC: { id: 'wrapped-bitcoin', price: 50000 },
  'WBTC.eth': { id: 'wrapped-bitcoin', price: 50000 },
  USDC: { id: 'usd-coin', price: 1 },
  'USDC.eth': { id: 'usd-coin', price: 1 },
  USDT: { id: 'tether', price: 1 },
  'USDT.eth': { id: 'tether', price: 1 },
  MTRG: { id: 'meter', price: 3 },
  TFUEL: { id: 'theta-fuel', price: 0.3204 },
  MTR: { id: 'meter-stable', price: 2.5 },
  WETH: { id: 'ethereum', price: 3500 },
  'WETH.eth': { id: 'ethereum', price: 3500 },
  BUSD: { id: 'binance-usd', price: 1 },
  'BUSD.bsc': { id: 'binance-usd', price: 1 },
  BNB: { id: 'binancecoin', price: 400 },
  'BNB.bsc': { id: 'binancecoin', price: 400 },
  MOVR: { id: 'moonriver', price: 312.97 },

  // pending
  VOLT: { id: 'voltswap', price: 0.2},
  VOLT_AIR:{id: 'voltswap', price:0.2},
  AMPL: { id: 'ampleforth', price: 1 },
  TDROP: { id: 'thetadrop', price: 1 },

  WTFUEL: { id: 'theta-fuel', price: 0.3204 },

  // extended
  CRV: { id: 'curve-dao-token', price: 1 },
  YFI: { id: 'yearn-finance', price: 1 },
  LINK: { id: 'chainlink', price: 1 },
  BAL: { id: 'balancer', price: 1 },
  COMP: { id: 'compound-governance-token', price: 1 },
}

export const getCurrentPrice = async (symbol: string): Promise<number> => {
  const cacheKey = `geyser|${symbol}|spot`
 
  const coin = symbolMap[symbol]
  if (!coin) {
    throw new Error(`Can't fetch price for ${symbol}`)
    
  }
 
  try {
    const query = coin.id
    return await ls.computeAndCache<number>(
      async () => { 
        const client = new CGApi()
        const reqTimeoutSec = 10
        const p: any = await Promise.race([
          client.simple.price({
            ids: [query],
            vs_currencies: ['usd'],
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('request timeout')), reqTimeoutSec * 1000)),
        ])

        console.log('query:', query, ', data: ', p.data)
        const price = p.data[query].usd
        
        return price as number
      },
      cacheKey,
      TTL,
    )
  } catch (e) {
    console.error(e)
    return coin.price || 0
  }
}

export const estimateVoltPrice = async () => {
  const tfuelPrice = await getCurrentPrice('TFUEL')

  const tfuelVoltPair = new Contract(
    '0x904a21bbce765c4771f7e139e19487b618c0da4d',
    IUniswapV2Pair,
    new ethers.providers.JsonRpcProvider('https://eth-rpc-api.thetatoken.org/rpc ', {
      name: 'theta mainnet',
      chainId: 361,
    }),
  )
  const { reserve0, reserve1 } = await tfuelVoltPair.getReserves()

  const price = new BigNumber(tfuelPrice).times(reserve0.toString()).div(reserve1.toString()).toNumber()

  console.log('est. VOLT price: ', price)
  return price
}

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
