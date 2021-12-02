import { BigNumber } from 'ethers'

import { formatUnits, parseUnits } from 'ethers/lib/utils'
import styled from 'styled-components/macro'
import tw from 'twin.macro'

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  precision: number
  maxValue: BigNumber
  onChange?: (value: string) => void
  skipMaxEnforcement?: boolean
}

export const PositiveInput: React.FC<Props> = (props) => {
  const { onChange, precision, maxValue, skipMaxEnforcement } = props

  const respectsPrecision = (value: string) => {
    if (value) {
      const parts = value.split('.')
      return parts.length > 1 ? parts[1].length <= precision : true
    }
    return true
  }

  const respectsMax = (value: string) => {
    if (skipMaxEnforcement) {
      return true
    }
    if (value) {
      return parseUnits(value, precision).lte(maxValue)
    }
    return true
  }

  const positiveOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = new RegExp(`(^\\d+$|^\\d+\\.\\d+$|^\\d+\\.$|^$)`)
    const { value } = e.currentTarget
    if (onChange && pattern.test(value) && respectsPrecision(value) && respectsMax(value)) {
      onChange(value)
    }
  }

  const setMax = () => {
    if (onChange) onChange(formatUnits(maxValue, precision))
  }

  return (
    <Container className="amountInput">
      <Input {...props} onChange={positiveOnChange} />
      <Button onClick={setMax}>max</Button>
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex flex-row border border-white h-fit mb-3 mt-1 `};
  border-radius: 15px;
`

const Input = styled.input`
  background: transparent;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  color: #fff;
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  padding: 10px;
  ${tw`w-10/12 font-semibold tracking-wider text-base`}
  ${tw`focus:outline-none`};
  border-radius: 20px;
`

const Button = styled.button`
  ${tw`uppercase focus:outline-none p-1 text-sm w-2/12 text-link bg-0D23EE bg-opacity-5`}
  color:#fff;
`
