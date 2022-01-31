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
  const inactiveGeysers = [
    "0xc12e91e9822234a04506053a884ba1269dc97245",
    "0x3375ebc33bbb038623829a2f75461d8ce752a9cb", 
    "0xb3ec01640ecac33505797d2933589ae486c0ce9f", 
    "0xacb3687d8c184d7c61223df304163fd493351796", 
    "0xd8c4e1091397d108791aefad536e906cc6940acb", 
    "0xfaf03cd86f88d9aa3254af4a057570c53cbdd576"
  ]

  const optgroups = (() => {
    // NOTE: active inactive logic is wrong
    // FIX ME!
    const activeGeysers = geysers
    .filter(({ status, id }) => status !== GeyserStatus.SHUTDOWN && !inactiveGeysers.includes(id) )
    .map(({ id }) => getGeyserName(id))
 
    const retiredGeysers = geysers
    .filter(({ status, id}) => status === GeyserStatus.SHUTDOWN || inactiveGeysers.includes(id))
    .map(({ id }) => getGeyserName(id))

    return [
      {
        group: 'Active Farms',
        options: activeGeysers,
      },
   
      {
        group: 'Inactive Farms',
        options: retiredGeysers
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
