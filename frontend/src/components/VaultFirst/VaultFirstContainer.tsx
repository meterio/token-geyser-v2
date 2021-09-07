import styled from 'styled-components/macro'
import { CardLabel, Overlay } from 'styling/styles'
import tw from 'twin.macro'
import { VaultBalanceView } from './VaultBalanceView'

export const VaultFirstContainer = () => (
  <Container>
    <Overlay>
      <Title>Manage Balances</Title>
      <VaultBalanceView />
    </Overlay>
  </Container>
)

const Title = styled(CardLabel)`
  ${tw`text-xl p-5 text-left font-normal text-white`}
`

const Container = styled.div`
  ${tw`text-center m-auto flex flex-wrap w-full flex-col`}
  ${tw`sm:w-sm`}
  box-shadow: 0 0 10px 8px #e6007e;
  border-radius: 15px;
`
