import styled from 'styled-components/macro'
import tw from 'twin.macro'
import { ResponsiveText } from 'styling/styles'
import { useContext } from 'react'
import { GeyserContext } from 'context/GeyserContext'
import { GeyserStatus } from 'types'
import { Dropdown } from './Dropdown'

export const GeysersList = () => {
 
  const { geysers, selectGeyserByName, selectedGeyserInfo: { geyser: selectedGeyser }, getGeyserName } = useContext(GeyserContext)
  const handleGeyserChange = (geyserName: string) => selectGeyserByName(geyserName)

  const optgroups = (() => {
    // NOTE: active inactive logic is wrong
    // FIX ME!
    const activeGeysers = geysers
    .filter(({ status, rewardToken }) => status !== GeyserStatus.SHUTDOWN && rewardToken !== "0xcdd298d54bac61e4d2479f774732b0fef1ccb808" )
    .map(({ id }) => getGeyserName(id))
 
    const testGeysers = geysers
    .filter(({ status, rewardToken }) => status === GeyserStatus.SHUTDOWN || rewardToken === "0xcdd298d54bac61e4d2479f774732b0fef1ccb808")
    .map(({ id }) => getGeyserName(id))

    return [
      {
        group: 'Active Farms',
        options: activeGeysers,
      },
   
      {
        group: 'Test Farms',
        options: testGeysers,
      }
    ]
  })()

  return (
    <>
      {geysers.length > 0 && (
        <GeysersListContainer>
          <Heading>
            <Label>Farm</Label>
          </Heading>
          <Dropdown
            optgroups={optgroups}
            selectedOption={getGeyserName(selectedGeyser ? selectedGeyser.id : geysers[0].id)}
            onChange={handleGeyserChange}
          />
        </GeysersListContainer>
      )}
    </>
  )
}

const GeysersListContainer = styled.div`
  ${tw`my-3`}
  ${tw`mx-5 sm:mx-10 xl:mx-5`}
`

const Heading = styled.div`
  ${tw`flex flex-row`}
`

const Label = styled.span`
  ${ResponsiveText}
  ${tw`tracking-wider`}
`
