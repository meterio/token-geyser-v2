import { Contract } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { RewardToken } from '../constants'
import { RewardSchedule, RewardTokenInfo, SignerOrProvider } from '../types'
import { UFRAGMENTS_ABI } from './abis/UFragments'
import { UFRAGMENTS_POLICY_ABI } from './abis/UFragmentsPolicy'
import { getTotalRewardShares } from './ampleforth'
import { defaultTokenInfo, getTokenInfo } from './token'

export const defaultRewardTokenInfo = (): RewardTokenInfo => ({
  ...defaultTokenInfo(),
  getTotalRewards: async () => 0,
})

export const getRewardTokenInfo = async (
  tokenAddress: string,
  token: RewardToken,
  signerOrProvider: SignerOrProvider,
) => {
  switch (token) {
    case RewardToken.MOCK:
      return getMockToken(tokenAddress, signerOrProvider)
    case RewardToken.AMPL:
      return getAMPLToken(tokenAddress, signerOrProvider)
    default:
      throw new Error(`Handler for ${token} not found`)
  }
}

const getMockToken = async (tokenAddress: string, signerOrProvider: SignerOrProvider): Promise<RewardTokenInfo> => {
  const tokenInfo = await getTokenInfo(tokenAddress, signerOrProvider)
  const getTotalRewards = async (rewardSchedules: RewardSchedule[]) =>
    rewardSchedules.reduce(
      (acc, schedule) => acc + parseFloat(formatUnits(schedule.rewardAmount, tokenInfo.decimals)),
      0,
    )

 
  return {
    ...tokenInfo,
    getTotalRewards,
  }
}

const getAMPLToken = async (tokenAddress: string, signerOrProvider: SignerOrProvider): Promise<RewardTokenInfo> => {
  const contract = new Contract(tokenAddress, UFRAGMENTS_ABI, signerOrProvider)
  const tokenInfo = await getTokenInfo(tokenAddress, signerOrProvider)
  const policyAddress: string = await contract.monetaryPolicy()
  const policy = new Contract(policyAddress, UFRAGMENTS_POLICY_ABI, signerOrProvider)

  const totalSupply = await contract.totalSupply()
  const epoch = parseInt(await policy.epoch(), 10)

  const getTotalRewards = async (rewardSchedules: RewardSchedule[]) => {
    const totalRewardShares = await getTotalRewardShares(
      rewardSchedules,
      policyAddress,
      epoch,
      tokenInfo.decimals,
      signerOrProvider,
    )
    return totalRewardShares * totalSupply
  }

  return {
    ...tokenInfo,
    getTotalRewards,
  }
}
