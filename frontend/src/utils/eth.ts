import { Contract, ethers } from 'ethers'
import {  UFRG_INIT_BLOCK } from '../constants'

export const getDefaultProvider = () => new ethers.providers.JsonRpcProvider('https://moonbeam.api.onfinality.io/public', { name: 'Moonbeam ', chainId: 1284 })
  

 


export const loadHistoricalLogs = async (contract: Contract, eventName: string, startBlock = UFRG_INIT_BLOCK) => {
  const filter = contract.filters[eventName]()
  return contract.queryFilter(filter, startBlock, 'latest')
}
