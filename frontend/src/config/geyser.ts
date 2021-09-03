import { RewardToken, StakingToken } from '../constants'
import { GeyserConfig } from '../types'

/**
 *
 * `address` should be the actual address to which the geyser contract was deployed
 *
 */
const mockGeyserConfigs: GeyserConfig[] = [
  {
    name: 'MTRG-MTR',
    address: '0xD8C4E1091397d108791aEFad536e906Cc6940acb',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'MTRG-USDC.eth',
    address: '0x3375ebc33bbb038623829a2f75461d8ce752a9cb',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
  
]


export const geyserConfigs: GeyserConfig[] = mockGeyserConfigs 