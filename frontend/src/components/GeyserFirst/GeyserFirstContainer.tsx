import { useContext } from 'react'
import styled from 'styled-components/macro'
import tw from 'twin.macro'
import {
 
  MobileView,
  isBrowser
 
} from "react-device-detect";
import { Overlay } from 'styling/styles'
import { GeyserContext } from 'context/GeyserContext'
import { ToggleView } from 'components/ToggleView'
import { GeyserStakeView } from './GeyserStakeView'
import { GeyserStatsView } from './GeyserStatsView'

export const GeyserFirstContainer = () => {
  const { isStakingAction, toggleStakingAction } = useContext(GeyserContext)

  return (
    <Container style={{width:isBrowser ? "80%":"fit-content"}}>
      <Overlay>
        <GeyserStatsView  />
      </Overlay>
      
      <MobileView>
      <Overlay>
        <ToggleContainer>
          <ToggleView enabled={isStakingAction} toggle={toggleStakingAction} options={['Stake', 'Unstake']} />
        </ToggleContainer>
        <GeyserStakeView />
        </Overlay>
        </MobileView>
     
    </Container>
  )
}

const Container = styled.div`
  ${tw`text-center m-auto my-4 flex flex-col flex-wrap w-full`}
  ${tw`sm:w-sm`};
 
  
  

  
  
`

const ToggleContainer = styled.div`
  ${tw`m-6`};
 
  
`
