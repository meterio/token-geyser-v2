import { RewardToken, StakingToken } from '../constants'
import { GeyserConfig } from '../types'

/**
 *
 * `address` should be the actual address to which the geyser contract was deployed
 *
 */
const mockGeyserConfigs: GeyserConfig[] = [
  {
    name: 'UNI-MTRG-MTR-V2',
    address: '0x87189970Bb34A487624D532E840d5431BfcDf1d8',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
  
]


export const geyserConfigs: GeyserConfig[] = mockGeyserConfigs 