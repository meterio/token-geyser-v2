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

  // active farms
  {
    name: 'VOLT',
    address: '0xDb84a42f23F2fcc91531DF06a48da5e3a970F1cf',
    stakingToken: StakingToken.VOLT,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'GLMR-VOLT',
    address: '0x5EFE36Df7235E9BB49a52D147fdaFAe6298520A0',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },

  {
    name: 'GLMR-MOVR',
    address: '0xF03d603635589eeaFC499B4eF4d57Dd301EE10Fc',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'GLMR-BNB.bsc',
    address: '0x524dc5743a1C74bDDA624de54cd0949CD9353Be0',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'GLMR-WBTC.eth',
    address: '0x00Ead383773aA379D0e8C162b96d164b1147B75d',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'GLMR-WETH.eth',
    address: '0x05097E2Ba96b8870949475115B9B91F75a0b308f',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'GLMR-BUSD.bsc',
    address: '0xfd8452e8ad9AdED8E16d37e5c2e300Be7884E217',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'GLMR-USDC.movr',
    address: '0x3236C028Ceca123Ffd5DA1cFE6E31071FB63082C',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'GLMR-MTRG',
    address: '0xcC98aE7160aa8c0FbBbbCd754d93bfAA0eBA3127',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'BUSD.bsc-USDT.eth',
    address: '0xD19F596B202E17b35c091D1a7520a55b7F345EDB',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
]

export const geyserConfigs: GeyserConfig[] = mockGeyserConfigs
