
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

import { GeyserFirstContainer } from './GeyserFirst/GeyserFirstContainer'
import { VaultFirstContainer } from './VaultFirst/VaultFirstContainer'
import { Mode } from '../constants'

export const Body = () => {
  const { mode } = useContext(AppContext)
  return mode === Mode.VAULTS ? <VaultFirstContainer /> : <GeyserFirstContainer />
}
