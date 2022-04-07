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
    address: '0xBfC69a757Dd7DB8C59e10c63aB023dc8c8cc95Dc',
    stakingToken: StakingToken.VOLT,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'VOLT: Earning AMPL',
    address: '0x55126153332d7b0d50D89572D73B7C3c9C7f0291',
    stakingToken: StakingToken.VOLT,
    rewardToken: RewardToken.MOCK,
  },

  {
    name: 'MTRG-FTB',
    address: '0x5fa46be49ba496c7e9632c65075eaced062a30f0',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
 
  {
    name: 'MTR-USDC.eth',
    address: '0xacb3687D8c184D7C61223Df304163fD493351796',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },

  {
    name: 'AMPL-MTRG',
    address: '0x0c96bFA1B1Cf1195F3EB7BEE88B636416bec810E',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
 


  {
    name: 'MTRG-BNB.bsc',
    address: '0xFaf03CD86f88d9aA3254Af4A057570C53cbDd576',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'MTRG-BUSD.bsc',
    address: '0x9fb600ecB8D10Be60fB7A4C32A2cD88585083D43',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'MTRG-MOVR',
    address: '0x55D6DBC656f0193c661fb86819A6CE41595BFf6B',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'MTRG-MTR',
    address: '0xa8D58E0DCa52Cf095D16041cc07Ef5FD65Bf9B49',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },

  {
    name: 'MTRG-USDC.eth',
    address: '0xc12E91E9822234A04506053A884bA1269Dc97245',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },

  {
    name: 'MTRG-USDT.eth',
    address: '0xB3EC01640EcAC33505797d2933589ae486C0CE9f',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },

  {
    name: 'MTRG-WETH.eth',
    address: '0x2D31EF0B7eDfAA43374331675376028E4DA7FcB1',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'USDC.eth-BUSD.bsc',
    address: '0x843a3F468816e502fDeef2Ca9d9B67Cd0aFa5D89',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },

  {
    name: 'VOLT-MTRG',
    address: '0x31a036bBb6818F626312f7205a8D282289bE21b4',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'VOLT-WETH.eth',
    address: '0x82df620865aBcA1C1B6Ae6d7C5334163982E6e5a',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },

  {
    name: 'WBTC.eth-WETH.eth',
    address: '0x97b68ce711dd5912ffe52779a739fb3cb82ef05f',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'WETH.eth-BNB.bsc',
    address: '0x2775B56AeA3D054a72edc72C8DEC6e13a0b2aA9C',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },

  {
    name: 'WETH.eth-BUSD.bsc',
    address: '0x78129302d999FFF62feB4f3cE35BB2fF49369ee4',
    stakingToken: StakingToken.UNISWAP_V2,
    rewardToken: RewardToken.MOCK,
  },
  {
    name:'BUSD.bsc-VOLT',
    address:'0xFDcCB5DE574E43E77bABE4dE521484dF13269630',
    stakingToken:StakingToken.UNISWAP_V2,
    rewardToken:RewardToken.MOCK
  },

  {
    name:'BUSD.bsc-USDT.eth',
    address:'0x5088E4DDD0641de157f70e5B7612fC3a41078dC4',
    stakingToken:StakingToken.UNISWAP_V2,
    rewardToken:RewardToken.MOCK
  },

 

  {
    name: 'MTRG-MTR-test',
    address: '0xD8C4E1091397d108791aEFad536e906Cc6940acb',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
  {
    name: 'MTRG-USDC.eth-test',
    address: '0x3375ebc33bbb038623829a2f75461d8ce752a9cb',
    stakingToken: StakingToken.MOCK,
    rewardToken: RewardToken.MOCK,
  },
]

export const geyserConfigs: GeyserConfig[] = mockGeyserConfigs
