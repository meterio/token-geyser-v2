import styled from 'styled-components/macro'
import tw from 'twin.macro'

interface Props {
  onClick: () => void
  displayText: string
  disabled?: boolean
}

export const GeyserInteractionButton: React.FC<Props> = ({ onClick, displayText, disabled }) => (
    <Button style={{border:displayText === 'Stake' ? '2px solid #e6007e' :'2px solid #125A85'}} disabled={disabled} onClick={onClick}>
      {displayText}
    </Button>
  )

const Button = styled.button`
 
  ${tw`hover:border-primary hover:bg-primary hover:text-secondary`}
  ${tw`disabled:cursor-not-allowed disabled:text-white`}
  height: 50px;
  border-radius:15px;
  
  color: rgba(255,255,255,var(--tw-text-opacity));
  text-transform: uppercase;
  font-weight: 600;
  
 
`
