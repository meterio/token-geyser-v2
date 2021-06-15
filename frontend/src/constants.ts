const MS_PER_SEC = 1000

export const HOUR_IN_SEC = 3600
export const DAY_IN_SEC = 24 * HOUR_IN_SEC
export const YEAR_IN_SEC = 365 * DAY_IN_SEC

export const HOUR_IN_MS = HOUR_IN_SEC * MS_PER_SEC
export const DAY_IN_MS = DAY_IN_SEC * MS_PER_SEC
export const YEAR_IN_MS = YEAR_IN_SEC * MS_PER_SEC

export const POLL_INTERVAL = 5 * MS_PER_SEC

// pseudo permanent cache time
export const CONST_CACHE_TIME_MS = YEAR_IN_MS

export const MOCK_ERC_20_ADDRESS = '0x0165878A594ca255338adfa4d48449f69242Eb8F'

// Staking tokens
export enum StakingToken {
  // for testing
  MOCK,

  // for mainnet
  UNISWAP_V2,
  SUSHISWAP,
  MOONISWAP_V1,
  BALANCER_V1,
  BALANCER_SMART_POOL_V1,
}
