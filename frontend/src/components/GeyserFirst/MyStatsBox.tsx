import styled from 'styled-components/macro'
import tw from 'twin.macro'
import { useSpring, animated } from 'react-spring'
import { useState } from 'react'
import { ResponsiveSubText, ResponsiveText } from 'styling/styles'

interface Props {
  name: string
  from?: number
  interpolate: (val: number) => string
  value: number
  units: string
  delim?: string
  classNames?: string
}

export const MyStatsBox: React.FC<Props> = ({
  classNames,
  name,
  units,
  delim,
  value: targetValue,
  from,
  interpolate,
}) => {
  const [statsValue, setStatsValue] = useState<string>(interpolate(targetValue))

  useSpring({
    val: targetValue,
    from: { val: from || 0 },
    onChange: ({ value }) => {
      setStatsValue(interpolate(value.val))
    },
  })

  return (
    <MyStatContainer>
      <MyStatName className={classNames}>{name}</MyStatName>
      <MyStatValueWrapper>
        <MyStatValueContainer>
          <MyStatValue>
            <animated.span>{statsValue}</animated.span>
            {delim}
            <MyStatUnits>{units}</MyStatUnits>
          </MyStatValue>
        </MyStatValueContainer>
      </MyStatValueWrapper>
    </MyStatContainer>
  )
}

const MyStatContainer = styled.div`
  ${tw`mt-4`}
  ${tw`sm:my-5 sm:col-span-1 sm:h-fit sm:h-72px`};
`

const MyStatName = styled.span`
  ${ResponsiveText}
  ${tw`mb-1 flex font-light`}
  ${tw`sm:mb-2 sm:block `}
  justify-self: center;
`

const MyStatValueWrapper = styled.div`
  ${tw`flex`}

  display: flex;
  justify-content: center;
  align-items: center;
`

const MyStatValueContainer = styled.div`
  ${tw`flex`};

  border: 2px solid #e6007e;

  border-radius: 9999px;

  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
  margin-top: 0.5rem;
  padding-top: 1.75rem;
  padding-bottom: 1.75rem;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 80px;
  width: 80px;
`

const MyStatValue = styled.span`
  ${tw`w-full text-center sm:text-center`}
  ${ResponsiveText}
`

const MyStatUnits = styled.span`
  ${ResponsiveSubText}
`
