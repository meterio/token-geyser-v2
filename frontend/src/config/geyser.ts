import { RewardToken, StakingToken } from '../constants'
import { GeyserConfig } from '../types'

/**
 *
 * `address` should be the actual address to which the geyser contract was deployed
 *
 */





const mockGeyserConfigs: GeyserConfig[] = [
  {
    name: 'TFUEL-VOLT-VOLT_AIR',
    address: '0xbd515e41df155112cc883f8981cb763a286261be',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  }
]

export const geyserConfigs: GeyserConfig[] = mockGeyserConfigs
