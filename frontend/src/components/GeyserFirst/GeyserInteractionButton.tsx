import styled from 'styled-components/macro'
import tw from 'twin.macro'

interface Props {
  onClick: () => void
  displayText: string
  disabled?: boolean
}

export const GeyserInteractionButton: React.FC<Props> = ({ onClick, displayText, disabled }) => (
  <Button
    style={{ border: displayText === 'Stake' ? '2px solid #e6007e' : '2px solid #01B1F7' }}
    disabled={disabled}
    onClick={onClick}
  >
    {displayText}
  </Button>
)

const Button = styled.button`
  ${tw`mt-3 hover:border-primary hover:bg-primary hover:text-white`}
  ${tw`disabled:cursor-not-allowed disabled:text-white disabled:bg-mediumGray`}
  height: 50px;
  border-radius: 50px;

  color: rgba(255, 255, 255, var(--tw-text-opacity));
  text-transform: uppercase;
  font-weight: 600;
`
