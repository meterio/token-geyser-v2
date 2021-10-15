import { useLazyQuery } from '@apollo/client'
import { createContext, useContext, useEffect, useState } from 'react'
import { toChecksumAddress } from 'web3-utils'
import { TransactionResponse } from '@ethersproject/providers'
import { BigNumber, Wallet } from 'ethers'
import { Geyser, TokenInfo, GeyserConfig, Vault, GeyserInfo } from 'types'
import { getTokenInfo } from 'utils/token'
import { geyserConfigs } from 'config/geyser'
import { defaultStakingTokenInfo, getStakingTokenInfo } from 'utils/stakingToken'
import { approveCreateDepositStake, approveDepositStake, unstake } from 'sdk'
import { GET_GEYSERS } from 'queries/geyser'
import { Centered } from 'styling/styles'
import { defaultRewardTokenInfo, getRewardTokenInfo } from 'utils/rewardToken'
import { additionalTokens } from 'config/additionalTokens'
import Web3Context from './Web3Context'
import { POLL_INTERVAL } from '../constants'

export const GeyserContext = createContext<{
  geysers: Geyser[]
  selectedGeyserInfo: GeyserInfo
  selectGeyser: (geyser: Geyser) => void
  selectGeyserById: (id: string) => void
  selectGeyserByName: (name: string) => void
  isStakingAction: boolean
  toggleStakingAction: () => void
  handleGeyserAction: (arg0: Vault | null, arg1: BigNumber) => Promise<TransactionResponse | undefined>
  allTokensInfos: TokenInfo[]
  getGeyserName: (id: string) => string
  getGeyserAddress: (name: string) => string
  selectedGeyserConfig: GeyserConfig | null
}>({
  geysers: [],
  selectedGeyserInfo: {
    geyser: null,
    stakingTokenInfo: defaultStakingTokenInfo(),
    rewardTokenInfo: defaultRewardTokenInfo(),
  },
  selectGeyser: () => {},
  selectGeyserById: () => {},
  selectGeyserByName: () => {},
  isStakingAction: true,
  toggleStakingAction: () => {},
  handleGeyserAction: async () => undefined,
  allTokensInfos: [],
  getGeyserName: () => '',
  getGeyserAddress: () => '',
  selectedGeyserConfig: null,
})

export const GeyserContextProvider: React.FC = ({ children }) => {
  const { signer, defaultProvider } = useContext(Web3Context)
  const signerOrProvider = signer || defaultProvider
  // Polling to fetch fresh geyser stats
  const [getGeysers, { loading: geyserLoading, data: geyserData }] = useLazyQuery(GET_GEYSERS, {
    pollInterval: POLL_INTERVAL,
  })
  const [geysers, setGeysers] = useState<Geyser[]>([])
  const [selectedGeyserInfo, setSelectedGeyserInfo] = useState<GeyserInfo>({
    geyser: null,
    stakingTokenInfo: defaultStakingTokenInfo(),
    rewardTokenInfo: defaultRewardTokenInfo(),
  })

  const [selectedGeyserConfig, setSelectedGeyserConfig] = useState<GeyserConfig | null>(null)
  const [allTokensInfos, setAllTokensInfos] = useState<TokenInfo[]>([])
  const [geyserAddressToName] = useState<Map<string, string>>(
    new Map(geyserConfigs.map((geyser) => [toChecksumAddress(geyser.address), geyser.name])),
  )
  const [geyserNameToAddress] = useState<Map<string, string>>(
    new Map(geyserConfigs.map((geyser) => [geyser.name, toChecksumAddress(geyser.address)])),
  )

  const [isStakingAction, setIsStakingAction] = useState(true)

  const toggleStakingAction = () => setIsStakingAction(!isStakingAction)

  const handleGeyserAction = async (selectedVault: Vault | null, parsedAmount: BigNumber) =>
    (isStakingAction ? handleStake : handleUnstake)(selectedVault, parsedAmount)

  const handleUnstake = async (selectedVault: Vault | null, parsedAmount: BigNumber) => {
    if (selectedGeyserInfo.geyser && selectedVault && signer) {
      const geyserAddress = selectedGeyserInfo.geyser.id
      const vaultAddress = selectedVault.id
      return unstake(geyserAddress, vaultAddress, parsedAmount, signer as Wallet)
    }
    return undefined
  }
  const handleStake = async (selectedVault: Vault | null, parsedAmount: BigNumber) => {
    if (selectedGeyserInfo.geyser && signer && !parsedAmount.isZero()) {
      const geyserAddress = selectedGeyserInfo.geyser.id
      return selectedVault
        ? approveDepositStake(geyserAddress, selectedVault.id, parsedAmount, signer as Wallet)
        : approveCreateDepositStake(geyserAddress, parsedAmount, signer as Wallet)
    }
    return undefined
  }

  const selectGeyser = async (geyser: Geyser) => {
    const geyserAddress = toChecksumAddress(geyser.id)
    const geyserConfig = geyserConfigs.find((config) => toChecksumAddress(config.address) === geyserAddress)
    if (!geyserConfig) {
      throw new Error(`Geyser config not found for geyser at ${geyserAddress}`)
    }
    const newStakingTokenInfo = await getStakingTokenInfo(
      geyser.stakingToken,
      geyserConfig.stakingToken,
      signerOrProvider,
    )
    const newRewardTokenInfo = await getRewardTokenInfo(geyser.rewardToken, geyserConfig.rewardToken, signerOrProvider)
    setSelectedGeyserConfig(geyserConfig)
    setSelectedGeyserInfo({
      geyser,
      stakingTokenInfo: newStakingTokenInfo,
      rewardTokenInfo: newRewardTokenInfo,
    })
  }
  const selectGeyserById = async (id: string) => {
    const geyser = geysers.find((g) => toChecksumAddress(g.id) === toChecksumAddress(id))
    if (geyser) await selectGeyser(geyser)
  }
  const selectGeyserByName = async (name: string) => {
    const geyserId = geyserNameToAddress.get(name)
    if (geyserId) await selectGeyserById(geyserId)
  }
  const getGeyserName = (id: string) => geyserAddressToName.get(toChecksumAddress(id)) || ''
  const getGeyserAddress = (name: string) => geyserNameToAddress.get(name) || ''

  useEffect(() => {
    const ids = geyserConfigs.map((geyser) => geyser.address.toLowerCase())
    getGeysers({ variables: { ids } })
  }, [])

  useEffect(() => {
    if (geyserData && geyserData.geysers) {
      const currentGeysers = [...geyserData.geysers].map((geyser) => ({
        ...geyser,
        status: geyser.powerSwitch.status,
      })) as Geyser[]
      const ids = geyserConfigs.map((geyser) => geyser.address.toLowerCase())
      currentGeysers.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
      setGeysers(currentGeysers)
      ;(async () => {
        try {
          // staking and reward tokens might have custom logic for name / symbol
          const geyserAddressToTokens = new Map(
            geyserConfigs.map(({ address, stakingToken, rewardToken }) => [
              toChecksumAddress(address),
              { stakingToken, rewardToken },
            ]),
          )

          const geyserTokens = currentGeysers.map(({ id, stakingToken, rewardToken }) => ({
            ...geyserAddressToTokens.get(toChecksumAddress(id))!,
            stakingTokenAddress: stakingToken,
            rewardTokenAddress: rewardToken,
          }))

          const geyserTokensSet = new Set(
            currentGeysers.flatMap(({ stakingToken, rewardToken }) =>
              [stakingToken, rewardToken].map(toChecksumAddress),
            ),
          )

          const rewardTokens = await Promise.all(
            geyserTokens.map(({ rewardToken, rewardTokenAddress }) =>
              getRewardTokenInfo(rewardTokenAddress, rewardToken, signerOrProvider),
            ),
          )
          const stakingTokens = await Promise.all(
            geyserTokens.map(({ stakingToken, stakingTokenAddress }) =>
              getStakingTokenInfo(stakingTokenAddress, stakingToken, signerOrProvider),
            ),
          )

          const additionalTokensInfos = (
            await Promise.allSettled(
              additionalTokens
                .filter(({ enabled, address }) => enabled && !geyserTokensSet.has(toChecksumAddress(address)))
                .map(({ address }) => getTokenInfo(address, signerOrProvider)),
            )
          )
            .filter(({ status }) => status === 'fulfilled')
            .map((result) => (result as PromiseFulfilledResult<TokenInfo>).value)

          // all relevant tokens: includes additional tokens from config/additionalTokens.ts and all staking & reward tokens from all geysers
          const newAllTokensInfos = additionalTokensInfos.concat(stakingTokens).concat(rewardTokens)
          setAllTokensInfos(newAllTokensInfos)
        } catch (e) {
          console.error(e)
        }
      })()
    }
  }, [geyserData])

  let queryGeyserName = ''
  let queryGeyserId = ''
  let geyserInit: any

  // extracts query from url query string
  const queryString = window.location.href.split('?')[1]
  if (queryString) {
    const [splitQueryString] = queryString.split('=')
    if (splitQueryString && splitQueryString === 'farm') {
      ;[, queryGeyserName] = queryString.split('=')
    }
  }

  if (queryGeyserName && geysers.length) {
    queryGeyserId = getGeyserAddress(queryGeyserName)
    const revString = queryGeyserName.split('-').reverse().join('-')
    let queryGeyserIdReverse = ''
    if (revString) {
      queryGeyserIdReverse = getGeyserAddress(revString)
    }
    if (queryGeyserId) {
      // sets initial geyser to the url query's geyser pool
      geyserInit = geysers.find((geyser) => toChecksumAddress(geyser.id) === toChecksumAddress(queryGeyserId))
    } else if (queryGeyserIdReverse) {
      // reverse the query string

      geyserInit = geysers.find((geyser) => toChecksumAddress(geyser.id) === toChecksumAddress(queryGeyserIdReverse))
    } else {
      ;[geyserInit] = geysers
    }
  } else {
    ;[geyserInit] = geysers
  }

  useEffect(() => {
    if (geysers.length > 0) {
      selectGeyser(geysers.find((geyser) => geyser.id === selectedGeyserInfo.geyser?.id) || geyserInit)
    }
  }, [geysers])

  if (geyserLoading) return <Centered>Loading...</Centered>

  return (
    <GeyserContext.Provider
      value={{
        geysers,
        selectedGeyserInfo,
        selectGeyser,
        selectGeyserById,
        selectGeyserByName,
        isStakingAction,
        toggleStakingAction,
        handleGeyserAction,
        allTokensInfos,
        getGeyserName,
        getGeyserAddress,
        selectedGeyserConfig,
      }}
    >
      {children}
    </GeyserContext.Provider>
  )
}
