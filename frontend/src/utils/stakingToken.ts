import { BigNumber, Contract } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { toChecksumAddress } from 'web3-utils'
import { StakingToken } from '../constants'
import { ERC20Balance } from '../sdk'
import { SignerOrProvider, StakingTokenInfo, TokenComposition } from '../types'
import { BALANCER_BPOOL_V1_ABI } from './abis/BalancerBPoolV1'
import { BALANCER_CRP_V1_ABI } from './abis/BalancerCRPV1'
import { MOONISWAP_V1_PAIR_ABI } from './abis/MooniswapV1Pair'
import { UNISWAP_V2_PAIR_ABI } from './abis/UniswapV2Pair'
import { getCurrentPrice } from './price'
import { defaultTokenInfo, getTokenInfo } from './token'
import { estimateVoltPrice } from './voltPrice'

export const defaultStakingTokenInfo = (): StakingTokenInfo => ({
  ...defaultTokenInfo(),
  price: 0,
  totalSupply: 0,
  marketCap: 0,
  composition: [],
})

export const getStakingTokenInfo = async (
  tokenAddress: string,
  token: StakingToken,
  signerOrProvider: SignerOrProvider,
): Promise<StakingTokenInfo> => {
  //  console.log('GET STAKING TOKEN INFO: ', tokenAddress, token)
  switch (token) {
    case StakingToken.VOLT:
      return getVOLTToken(tokenAddress)
    case StakingToken.MOCK:
      return getUniswapV2(tokenAddress, signerOrProvider)
    case StakingToken.UNISWAP_V2:
      return getUniswapV2(tokenAddress, signerOrProvider)
    case StakingToken.SUSHISWAP:
      return getSushiswap(tokenAddress, signerOrProvider)
    case StakingToken.MOONISWAP_V1:
      return getMooniswap(tokenAddress, signerOrProvider)
    case StakingToken.BALANCER_V1:
      return getBalancerV1(tokenAddress, signerOrProvider)
    case StakingToken.BALANCER_SMART_POOL_V1:
      return getBalancerSmartPoolV1(tokenAddress, signerOrProvider)
    default:
      throw new Error(`Handler for ${token} not found`)
  }
}

const getTokenComposition = async (
  tokenAddress: string,
  stakingTokenAddress: string,
  signerOrProvider: SignerOrProvider,
  weight: number,
): Promise<TokenComposition> => {
  const { name, symbol, decimals } = await getTokenInfo(tokenAddress, signerOrProvider)
  const price = await getCurrentPrice(symbol)
  const balance = await ERC20Balance(tokenAddress, stakingTokenAddress, signerOrProvider)

  const balanceNumber = parseInt(formatUnits(balance as BigNumber, decimals), 10)

  return {
    address: tokenAddress,
    name,
    symbol,
    balance: balanceNumber,
    decimals,
    value: price * balanceNumber,
    weight,
  }
}

const getTokenCompositions = async (
  tokenAddresses: string[],
  stakingTokenAddress: string,
  signerOrProvider: SignerOrProvider,
  weights: number[],
): Promise<TokenComposition[]> => {
  const compositions = await Promise.all(
    tokenAddresses.map((token, index) =>
      getTokenComposition(token, stakingTokenAddress, signerOrProvider, weights[index]),
    ),
  )

  return compositions
}

const getMarketCap = (composition: TokenComposition[]) => composition.reduce((m, c) => m + c.value, 0)

const uniswapV2Pair = async (
  tokenAddress: string,
  signerOrProvider: SignerOrProvider,
  namePrefix: string,
  symbolPrefix: string,
): Promise<StakingTokenInfo> => {
  const address = toChecksumAddress(tokenAddress)

  const contract = new Contract(address, UNISWAP_V2_PAIR_ABI, signerOrProvider)
  const token0Address: string = await contract.token0()
  const token1Address: string = await contract.token1()

  const decimals: number = await contract.decimals()

  const totalSupply: BigNumber = await contract.totalSupply()

  const totalSupplyNumber = parseFloat(formatUnits(totalSupply, decimals))

  const tokenCompositions = await getTokenCompositions(
    [token0Address, token1Address],
    address,
    signerOrProvider,
    [0.5, 0.5],
  )

  const [token0Symbol, token1Symbol] = tokenCompositions.map((c) => c.symbol)
  const marketCap = getMarketCap(tokenCompositions)
  // const name = tokenCompositions.map((c) => c.symbol).join('-')
  // console.log(`Got Uniswap pair: ${name}`)
  // console.log('token composition: ', tokenCompositions)
  // console.log(
  //   'market cap: ',
  //   marketCap,
  //   ', total supply:',
  //   totalSupplyNumber,
  //   'lp price:',
  //   marketCap / totalSupplyNumber,
  // )

  return {
    address: toChecksumAddress(tokenAddress),
    name: `${namePrefix}-${token0Symbol}-${token1Symbol} Liquidity Token`,
    symbol: `${symbolPrefix}-${token0Symbol}-${token1Symbol}-V2`,
    decimals,
    price: marketCap / totalSupplyNumber,
    totalSupply: totalSupplyNumber,
    marketCap,
    composition: tokenCompositions,
  }
}

const getUniswapV2 = async (tokenAddress: string, signerOrProvider: SignerOrProvider) =>
  uniswapV2Pair(tokenAddress, signerOrProvider, 'UniswapV2', 'UNI')

const getSushiswap = async (tokenAddress: string, signerOrProvider: SignerOrProvider) =>
  uniswapV2Pair(tokenAddress, signerOrProvider, 'Sushiswap', 'SUSHI')

const getMooniswap = async (tokenAddress: string, signerOrProvider: SignerOrProvider): Promise<StakingTokenInfo> => {
  const address = toChecksumAddress(tokenAddress)
  const contract = new Contract(address, MOONISWAP_V1_PAIR_ABI, signerOrProvider)
  const tokens: [string, string] = await contract.getTokens()
  const [token0Address, token1Address] = tokens
  const { name, symbol, decimals } = await getTokenInfo(address, signerOrProvider)

  const totalSupply: BigNumber = await contract.totalSupply()

  const totalSupplyNumber = parseFloat(formatUnits(totalSupply, decimals))

  const tokenCompositions = await getTokenCompositions(
    [token0Address, token1Address],
    address,
    signerOrProvider,
    [0.5, 0.5],
  )
  const marketCap = getMarketCap(tokenCompositions)

  return {
    address,
    name,
    symbol,
    decimals,
    price: marketCap / totalSupplyNumber,
    totalSupply: totalSupplyNumber,
    marketCap,
    composition: tokenCompositions,
  }
}

const getBalancerTokenCompositions = async (
  address: string,
  signerOrProvider: SignerOrProvider,
): Promise<TokenComposition[]> => {
  const contract = new Contract(address, BALANCER_BPOOL_V1_ABI, signerOrProvider)
  const tokenAddresses: string[] = await contract.getCurrentTokens()
  const totalDenormalizedWeight: number = await contract.getTotalDenormalizedWeight()
  const tokenDenormalizedWeights: number[] = await Promise.all(
    tokenAddresses.map((token) => contract.getDenormalizedWeight(token)),
  )
  const tokenWeights = tokenDenormalizedWeights.map((w) => w / totalDenormalizedWeight)

  return getTokenCompositions(tokenAddresses, address, signerOrProvider, tokenWeights)
}

const getBalancerV1 = async (tokenAddress: string, signerOrProvider: SignerOrProvider): Promise<StakingTokenInfo> => {
  const address = toChecksumAddress(tokenAddress)
  const contract = new Contract(address, BALANCER_BPOOL_V1_ABI, signerOrProvider)

  const { name, symbol, decimals } = await getTokenInfo(address, signerOrProvider)

  const totalSupply: BigNumber = await contract.totalSupply()
  const totalSupplyNumber = parseFloat(formatUnits(totalSupply, decimals))

  const tokenCompositions = await getBalancerTokenCompositions(address, signerOrProvider)
  const marketCap = getMarketCap(tokenCompositions)

  return {
    address,
    decimals,
    name,
    symbol,
    totalSupply: totalSupplyNumber,
    marketCap,
    price: marketCap / totalSupplyNumber,
    composition: tokenCompositions,
  }
}

const getBalancerSmartPoolV1 = async (
  tokenAddress: string,
  signerOrProvider: SignerOrProvider,
): Promise<StakingTokenInfo> => {
  const address = toChecksumAddress(tokenAddress)
  const contract = new Contract(address, BALANCER_CRP_V1_ABI, signerOrProvider)

  const bPool: string = await contract.bPool()
  const { name, symbol, decimals } = await getTokenInfo(address, signerOrProvider)

  const totalSupply: BigNumber = await contract.totalSupply()
  const totalSupplyNumber = parseFloat(formatUnits(totalSupply, decimals))

  const tokenCompositions = await getBalancerTokenCompositions(bPool, signerOrProvider)
  const marketCap = getMarketCap(tokenCompositions)

  return {
    address,
    decimals,
    name,
    symbol,
    totalSupply: totalSupplyNumber,
    marketCap,
    price: marketCap / totalSupplyNumber,
    composition: tokenCompositions,
  }
}

// const getMockLPToken = async (tokenAddress: string): Promise<StakingTokenInfo> => {
//   const price = ((await getCurrentPrice('AMPL')) + (await getCurrentPrice('BAL'))) / 2

//   return {
//     address: toChecksumAddress(tokenAddress),
//     name: `MOCK-AMPL-BAL Liquidity Token`,
//     symbol: `MOCK-AMPL-BAL`,
//     decimals: 18,
//     price,
//     totalSupply: 100000,
//     marketCap: 100000 * price,
//     composition: [],
//   }
// }
const getVOLTToken = async (tokenAddress: string): Promise<StakingTokenInfo> => {
  const price = await estimateVoltPrice()

  return {
    address: toChecksumAddress(tokenAddress),
    name: `VOLT Token`,
    symbol: `VOLT`,
    decimals: 18,
    price,
    totalSupply: 100000, // TODO: here it's a fake number, only used for AMPL
    marketCap: 100000 * price, // TODO: herer it's a fake number only used for AMPL
    composition: [],
  }
}
