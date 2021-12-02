import { TypedDataField } from '@ethersproject/abstract-signer'
import { BigNumberish, Contract, providers, Signer, Wallet } from 'ethers'
import { LogDescription, splitSignature } from 'ethers/lib/utils'
import { TransactionReceipt } from '@ethersproject/providers'
import localhostConfig from './deployments/localhost/factories-latest.json'


export const loadNetworkConfig = async (signerOrProvider: Signer | providers.Provider) => {

      console.log(signerOrProvider)
      return localhostConfig
  
}

export const isPermitable = async (tokenAddress: string) => {
  // todo: implement permit token querying
  console.log(tokenAddress)
  return true
}

export const signPermission = async (
  method: string,
  vault: Contract,
  owner: Wallet,
  delegateAddress: string,
  tokenAddress: string,
  amount: BigNumberish,
  vaultNonce?: BigNumberish,
  chainId?: BigNumberish,
) => {
  // get nonce
 
  const tvaultNonce = vaultNonce || (await vault.getNonce())
  // get chainId
  const tchainId = chainId || (await vault.provider.getNetwork()).chainId
  
  // craft permission
  const domain = {
    name: 'UniversalVault',
    version: '1.0.0',
    chainId:tchainId,
    verifyingContract: vault.address,
  }
  const types = {} as Record<string, TypedDataField[]>
  types[method] = [
    { name: 'delegate', type: 'address' },
    { name: 'token', type: 'address' },
    { name: 'amount', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
  ]
  const value = {
    delegate: delegateAddress,
    token: tokenAddress,
    amount,
    nonce: tvaultNonce,
  }
  // sign permission
  // todo: add fallback if wallet does not support eip 712 rpc
// eslint-disable-next-line no-underscore-dangle
  const signedPermission = await owner._signTypedData(domain, types, value)
  // return

  const replaceV: any = [];
  replaceV['00'] = '1b';
  replaceV['01'] = '1c';

  let signedPermissionNew;
  if (replaceV[signedPermission.slice(-2)]) {
    signedPermissionNew =
      signedPermission.slice(0, signedPermission.length - 2) +
      replaceV[signedPermission.slice(-2)];
  } else {
    signedPermissionNew = signedPermission;
  }

  return signedPermissionNew
}

export const signPermitEIP2612 = async (
  owner: Wallet,
  token: Contract,
  spenderAddress: string,
  value: BigNumberish,
  deadline: BigNumberish,
  nonce?: BigNumberish,
) => {
  // get nonce
  const tnonce = nonce || (await token.nonces(owner.address))
  // get domain
  const domainSeparator = await token.DOMAIN_SEPARATOR()
  // get types
  const types = {} as Record<string, TypedDataField[]>
  types.Permit = [
    { name: 'owner', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
  ]
  // get values
  const values = {
    owner: owner.address,
    spender: spenderAddress,
    value,
    nonce: tnonce,
    deadline,
  }
  // sign permission
  // todo: add fallback if wallet does not support eip 712 rpc
  // eslint-disable-next-line no-underscore-dangle
  const signedPermission = await owner._signTypedData(domainSeparator, types, values)
  // split signature
  const sig = splitSignature(signedPermission)
  // return
  return [values.owner, values.spender, values.value, values.deadline, sig.v, sig.r, sig.s]
}

// utility function to parse an event from a transaction receipt
// useful when we need to get data from a specific transaction (e.g. getting the actual rewards claimed from unstake)
export const parseEventFromReceipt = (
  receipt: TransactionReceipt,
  contract: Contract,
  event: string,
): LogDescription | null => {
  const filter = contract.filters[event]
  if (!filter) return null
  const eventFilter = filter()
  if (!eventFilter || !eventFilter.topics || eventFilter.topics.length === 0) return null
  const topicHash = eventFilter.topics[0]
  const filteredLogs = receipt.logs.filter((log) => log.topics[0] === topicHash)
  if (filteredLogs.length > 0) {
    return contract.interface.parseLog(filteredLogs[0])
  }
  return null
}
