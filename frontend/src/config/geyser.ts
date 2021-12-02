import { RewardToken, StakingToken } from '../constants'
import { GeyserConfig } from '../types'

/**
 *
 * `address` should be the actual address to which the geyser contract was deployed
 *
 */

const mockGeyserConfigs: GeyserConfig[] = [
  {
    name:'VOLT',
    stakingToken: StakingToken.VOLT,
    rewardToken: RewardToken.MOCK,
    address:'0xCd872033f3Ed9227BC78F47fB0E0DFf7dbDBE5B4'
  },
  {
    name: 'TFUEL-VOLT (Test)',
    address: '0xbd515e41df155112cc883f8981cb763a286261be',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },

  {
    name: 'TFUEL-BUSD.bsc',
    address: '0x743e7034652b7555Ed96c280Ae89f5EC0383696f',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'BUSD.bsc-USDC',
    address: '0x02F7214305f8e4419d6B2Fe10A56E9566e6c388E',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'TFUEL-WETH',
    address: '0x139B2305dA9D000dde725203857d9CA90d58DB3b',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'TFUEL-USDC',
    address: '0x5EFE36Df7235E9BB49a52D147fdaFAe6298520A0',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'TFUEL-BNB.bsc',
    address: '0xA1cB648E50527B954E36a9E9c0E8ca29942b38c2',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'TFUEL-VOLT',
    address: '0xF0F5ef5aB3CBAf7A0cE4cecc1Ab0285123954f2E',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'BUSD.bsc-VOLT',
    address: '0x0E346abF5A93fF41E9368009eE0A0a6d54fB47fa',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'TFUEL-MTRG',
    address: '0x702dA5e934A4f1b1C1e8fD8b3190ddb537D1108D',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  }
  
  
]

export const geyserConfigs: GeyserConfig[] = mockGeyserConfigs
