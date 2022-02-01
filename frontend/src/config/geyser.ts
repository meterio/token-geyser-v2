import { RewardToken, StakingToken } from '../constants'
import { GeyserConfig } from '../types'

/**
 *
 * `address` should be the actual address to which the geyser contract was deployed
 *
 */

const mockGeyserConfigs: GeyserConfig[] = [
  {
    name: 'VOLT',
    stakingToken: StakingToken.VOLT,
    rewardToken: RewardToken.MOCK,
    address: '0xcd872033f3ed9227bc78f47fb0e0dff7dbdbe5b4',
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
  },
  {
    name: 'TDROP-TFUEL: Earning TDROP',
    address: '0x6ae05Db50e1D9343188b0758885c4dB4896aF4B2',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'TDROP-TFUEL: Earning VOLT',
    address: '0xF8dCEA3c9bBf8c61d5a67B8BCD5787f0A99c3B03',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'TDROP-VOLT',
    address: '0xdD2fcfc6b9E881AC0aBcea6E2ce6b668B9EA4566',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
]

export const geyserConfigs: GeyserConfig[] = mockGeyserConfigs
