const MS_PER_SEC = 1000

export const MIN_IN_SEC = 60
export const HOUR_IN_SEC = 60 * MIN_IN_SEC
export const DAY_IN_SEC = 24 * HOUR_IN_SEC
export const WEEK_IN_SEC = 7 * DAY_IN_SEC
export const MONTH_IN_SEC = 30 * DAY_IN_SEC
export const YEAR_IN_SEC = 365 * DAY_IN_SEC

export const MIN_IN_MS = MIN_IN_SEC * MS_PER_SEC
export const HOUR_IN_MS = HOUR_IN_SEC * MS_PER_SEC
export const DAY_IN_MS = DAY_IN_SEC * MS_PER_SEC
export const WEEK_IN_MS = WEEK_IN_SEC * MS_PER_SEC
export const MONTH_IN_MS = MONTH_IN_SEC * MS_PER_SEC
export const YEAR_IN_MS = YEAR_IN_SEC * MS_PER_SEC

// polling interval for querying subgraph
export const POLL_INTERVAL = 30 * MS_PER_SEC

// pseudo permanent cache time
export const CONST_CACHE_TIME_MS = YEAR_IN_MS

// geyser stats cache time
export const GEYSER_STATS_CACHE_TIME_MS = MIN_IN_MS

export const MOCK_ERC_20_ADDRESS = '0xad2B4188C301eE417F145A95c4CEa8618e2aB5a1'

// app mode
export enum Mode {
  VAULTS,
  GEYSERS,
}

// transaction state
export enum TxState {
  PENDING,
  SUBMITTED,
  MINED,
  FAILED,
}

export const EXTERNAL_LINKS: Record<string, string> = {
  etherscan: 'https://explorer.thetatoken.org/txs',
}

// Staking tokens
export enum StakingToken {
  // for testing
  MOCK,

  // for mainnet
  VOLT,
  UNISWAP_V2,
  SUSHISWAP,
  MOONISWAP_V1,
  BALANCER_V1,
  BALANCER_SMART_POOL_V1,
}

// Reward tokens
export enum RewardToken {
  // for testing
  MOCK,

  // for mainnet
  AMPL,
}

// subgraph endpoint

export const GEYSER_SUBGRAPH_ENDPOINT = `http://13.229.153.186:8000/subgraphs/name/theta/geyser-v2`

// ufragments deploy block number
export const UFRG_INIT_BLOCK = 7947823

export const AMPL_LAUNCH_DATE = 1561687200
export const INITIAL_SUPPLY = 50000000

// tooltip messages
export const GET_APY_STAKE_MSG = () =>
  'APY is estimated for your current deposits based on staking to reach the maximum reward multiplier. The APY metric does not account for gains or losses from holding liquidity tokens, or gains from liquidity mining rewards distributed by the underlying platform for holding liquidity tokens.'

export const GET_APY_NO_STAKE_MSG = ({ days = '1' }) =>
  `APY is estimated for an avg deposit (20,000 USD) over the next ${days} days. The APY metric does not account for gains or losses from holding liquidity tokens, or gains from liquidity mining rewards distributed by the underlying platform for holding liquidity tokens.`

export const GET_REWARD_MULTIPLIER_MSG = ({ days = '1', multiplier = '1.0' }) =>
  `It takes ${days} days of continuous staking for the reward multiplier to go from 1x to  ${multiplier}x gradually.  The multiplier applies to the all rewards you earned during the staking period starting from day 1. Deposit liquidity tokens for ${days} days to achieve your full rewards potential.`

export const GET_CURRENT_REWARDS_MSG = () =>
  'Your share of the total unlocked reward pool. The larger your deposit and for longer, the higher your share.'

export const GET_ESTIMATED_REWARDS_MSG = () =>
  'Estimated rewards assume you have achieved the maximum reward multiplier.'

// alignment
export enum Align {
  LEFT,
  RIGHT,
  CENTER,
}

// Alchemy
export const ALCHEMY_PROJECT_ID = 'geo5oyrZyF7LWPaAt7eoLzxHg76ljgsO'

// Infura
export const INFURA_PROJECT_ID = 'dee1a87a734042fcabc2fd116a7b776d'

// Enable withdrawing whole unlocked balance of staking tokens when unstaking
export const WITHDRAW_UNLOCKED_STAKING_TOKENS_WHEN_UNSTAKING = false

// Enable withdrawing whole unlocked balance of reward tokens when unstaking
export const WITHDRAW_UNLOCKED_REWARD_TOKENS_WHEN_UNSTAKING = false