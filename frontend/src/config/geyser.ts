import { RewardToken, StakingToken } from '../constants'
import { GeyserConfig } from '../types'

/**
 *
 * `address` should be the actual address to which the geyser contract was deployed
 *
 */

const mockGeyserConfigs: GeyserConfig[] = [

  {
    name: 'GLMR-MTRG ',
    address: '0x8E789b5393F5b4614b75698075c08e6a89A9fb74',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },

  
  
  
]

export const geyserConfigs: GeyserConfig[] = mockGeyserConfigs