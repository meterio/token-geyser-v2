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
 
  let queryGeyserId = ""
  let geyserid = ""

 
  const queryString = window.location.href.split('?')[1]
  if(queryString){
  const splitQueryString = queryString.split('=')[0]
  if(splitQueryString && splitQueryString === 'farm_id'){
    [, queryGeyserId] = queryString.split('=')

  }


  }

  const optgroups = (() => {
    // NOTE: active inactive logic is wrong
    // FIX ME!
    const activeGeysers = geysers
      .filter(({ status }) => status !== GeyserStatus.SHUTDOWN)
      .map(({ id }) => getGeyserName(id))
    const inactiveGeysers = geysers
      .filter(({ status }) => status === GeyserStatus.SHUTDOWN)
      .map(({ id }) => getGeyserName(id))

    return [
      {
        group: 'Active Farms',
        options: activeGeysers,
      },
      {
        group: 'Inactive Farms',
        options: inactiveGeysers,
      },
    ]
  })()




  if(queryGeyserId){
    geyserid = queryGeyserId
  }else if(geysers && geysers.length){
    
    geyserid = geysers[0].id
    
  }




  return (
    <>
      {geysers.length > 0 && (
        <GeysersListContainer>
          <Heading>
            <Label>Farm</Label>
          </Heading>
          <Dropdown
            optgroups={optgroups}
            selectedOption={getGeyserName(selectedGeyser ? selectedGeyser.id : geyserid)}
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
