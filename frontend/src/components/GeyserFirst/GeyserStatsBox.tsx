import { useState } from 'react'
import styled from 'styled-components/macro'
import tw from 'twin.macro'
import { useSpring, animated } from 'react-spring'
import { ResponsiveSubText, ResponsiveText } from 'styling/styles'

interface Props {
  name: string
  value: number
  units: string
  from?: number
  interpolate?: (val: number) => string
}

export const GeyserStatsBox: React.FC<Props> = ({ name, value: targetValue, units, children, from, interpolate }) => {
  const [statsValue, setStatsValue] = useState<string>(interpolate ? interpolate(targetValue) : `${targetValue}`)

  useSpring({
    val: targetValue,
    from: { val: from || 0 },
    onChange: ({ value }) => {
      setStatsValue(interpolate ? interpolate(value.val) : `${value.val}`)
    },
  })

  return (
    <GeyserStatsBoxContainer>
      <GeyserStatsBoxLabel>{name}</GeyserStatsBoxLabel>
      <GeyserStatsBoxValueContainer>
        <GeyserStatsBoxValue>
          <animated.span>{statsValue}</animated.span>{' '}
          <GeyserStatsBoxUnits>
            {units}
            {children}
          </GeyserStatsBoxUnits>
        </GeyserStatsBoxValue>
      </GeyserStatsBoxValueContainer>
    </GeyserStatsBoxContainer>
  )
}

const GeyserStatsBoxContainer = styled.div`
  color: #fff;
`

const GeyserStatsBoxLabel = styled.span`
  ${ResponsiveText}
  ${tw`mb-1 flex font-light`}
  justify-content: center;
`

const GeyserStatsBoxValueContainer = styled.div`
  ${tw`flex flex-row`}
  justify-content: center;
`

const GeyserStatsBoxValue = styled.span`
  ${ResponsiveText}
  ${ResponsiveText}
  // border:1px solid #e6007e;
  // border-radius: 15px;
  font-weight:bold;
  padding: 5px;
  // width: 120px;
`

const GeyserStatsBoxUnits = styled.span`
  ${ResponsiveSubText}
`
