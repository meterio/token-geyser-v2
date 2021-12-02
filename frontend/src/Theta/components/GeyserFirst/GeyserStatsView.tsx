import styled from 'styled-components/macro'
import tw from 'twin.macro'
import { MyStats } from './MyStats'
import { GeyserStats } from './GeyserStats'

export const GeyserStatsView = () => (
  <GeyserStatsContainer style={{ height: 'fit-content' }}>
    <MyStats />
    <GeyserStats />
  </GeyserStatsContainer>
)

const GeyserStatsContainer = styled.div`
  ${tw`w-full h-280px py-2 px-3`};
  ${tw`sm:h-312px`};

  background: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  box-shadow: 0 0 15px 8px #e6007e;
`
