import { BigNumber, BigNumberish, Contract, providers, Signer } from 'ethers'
import { TransactionReceipt } from '@ethersproject/providers'
import { loadNetworkConfig, parseEventFromReceipt } from './utils'
import { VaultData } from './types'

async function texecGeyserFunction<T>(
  geyserAddress: string,
  signerOrProvider: Signer | providers.Provider,
  fnc: string,
  args: any[] = [],
): Promise<T> {
  const config = await loadNetworkConfig(signerOrProvider)
  const geyser = new Contract(geyserAddress, config.GeyserTemplate.abi, signerOrProvider)
  return geyser[fnc](...args) as Promise<T>
}

async function texecVaultFunction<T>(
  vaultAddress: string,
  signerOrProvider: Signer | providers.Provider,
  fnc: string,
  args: any[] = [],
): Promise<T> {
  const config = await loadNetworkConfig(signerOrProvider)
  const vault = new Contract(vaultAddress, config.VaultTemplate.abi, signerOrProvider)
  return vault[fnc](...args) as Promise<T>
}

export const getGeyserVaultData = async (
  geyserAddress: string,
  vaultAddress: string,
  signerOrProvider: Signer | providers.Provider,
) => texecGeyserFunction<VaultData>(geyserAddress, signerOrProvider, 'getVaultData', [vaultAddress])


export const getCurrentVaultReward = async (
  vaultAddress: string,
  geyserAddress: string,
  signerOrProvider: Signer | providers.Provider,
) => texecGeyserFunction<BigNumber>(geyserAddress, signerOrProvider, 'getCurrentVaultReward', [vaultAddress])


export const getFutureVaultReward = async (
  vaultAddress: string,
  geyserAddress: string,
  timestamp: number,
  signerOrProvider: Signer | providers.Provider,
) =>  texecGeyserFunction<BigNumber>(geyserAddress, signerOrProvider, 'getFutureVaultReward', [
    vaultAddress,
    timestamp,
  ])


export const getCurrentUnlockedRewards = async (
  geyserAddress: string,
  signerOrProvider: Signer | providers.Provider,
) => texecGeyserFunction<BigNumber>(geyserAddress, signerOrProvider, 'getCurrentUnlockedRewards')


export const getFutureUnlockedRewards = async (
  geyserAddress: string,
  timestamp: number,
  signerOrProvider: Signer | providers.Provider,
) => texecGeyserFunction<BigNumber>(geyserAddress, signerOrProvider, 'getFutureUnlockedRewards', [timestamp])


export const getCurrentStakeReward = async (
  vaultAddress: string,
  geyserAddress: string,
  amount: BigNumberish,
  signerOrProvider: Signer | providers.Provider,
) =>  texecGeyserFunction<BigNumber>(geyserAddress, signerOrProvider, 'getCurrentStakeReward', [
    vaultAddress,
    amount,
  ])


export const getBalanceLocked = async (
  vaultAddress: string,
  tokenAddress: string,
  signerOrProvider: Signer | providers.Provider,
) => texecVaultFunction<BigNumber>(vaultAddress, signerOrProvider, 'getBalanceLocked', [tokenAddress])


export const getClaimedRewardsFromUnstake = async (
  receipt: TransactionReceipt,
  geyserAddress: string,
  signerOrProvider: Signer | providers.Provider,
) => {
  const config = await loadNetworkConfig(signerOrProvider)
  const geyser = new Contract(geyserAddress, config.GeyserTemplate.abi, signerOrProvider)
  const eventLog = parseEventFromReceipt(receipt, geyser, 'RewardClaimed')
  if (!eventLog) return null
  return eventLog.args
}
