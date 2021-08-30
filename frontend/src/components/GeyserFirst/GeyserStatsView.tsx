import styled from 'styled-components/macro'
import tw from 'twin.macro'
import { MyStats } from './MyStats'
import { GeyserStats } from './GeyserStats'

export const GeyserStatsView = () => (
  <GeyserStatsContainer style={{height:"fit-content"}}>
    <MyStats />
    <GeyserStats />
  </GeyserStatsContainer>
)

const GeyserStatsContainer = styled.div`

  ${tw`grid grid-cols-2 w-full h-280px`};
  ${tw`sm:h-312px`};
 

  background: rgba(0,0,0,0.1);

  
  
  box-shadow: #e6007e 0px 4px 16px, #e6007e 0px 8px 32px;
 
  
`
