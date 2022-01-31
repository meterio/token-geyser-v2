import { useContext, useCallback } from 'react'
import styled from 'styled-components/macro'
import tw from 'twin.macro'
import { GeyserContext } from 'context/GeyserContext'
import { StatsContext } from 'context/StatsContext'
import { ResponsiveText } from 'styling/styles'
import { safeNumeral } from 'utils/numeral'
import { Tooltip } from 'components/Tooltip'
import { GeyserStatsBox } from './GeyserStatsBox'
import { MyStatsBox } from './MyStatsBox'
import {
  GET_APY_NO_STAKE_MSG,
  GET_APY_STAKE_MSG,
  GET_CURRENT_REWARDS_MSG,
  GET_REWARD_MULTIPLIER_MSG,
} from '../../constants'

export const MyStats = () => {
  const {
    userStats: { apy, currentMultiplier, currentReward },
    vaultStats: { currentStake },
    geyserStats: { calcPeriodInDays },
  } = useContext(StatsContext)

  const {
    selectedGeyserInfo: {
      geyser: selectedGeyser,
      rewardTokenInfo: { symbol: rewardTokenSymbol },
    },
  } = useContext(GeyserContext)

  let maxMultiplier = 1
  
  if(selectedGeyser){

    maxMultiplier = parseInt(selectedGeyser?.scalingCeiling, 10) / parseInt(selectedGeyser?.scalingFloor, 10)
  }

  const getTooltipMessages = useCallback(
    () => [
      {
        title: 'APY',
        body:
          currentStake > 0
            ? GET_APY_STAKE_MSG()
            : GET_APY_NO_STAKE_MSG({ days: safeNumeral(calcPeriodInDays || 70, '0.0') }),
      },
      {
        title: 'Reward Multiplier',
        body: GET_REWARD_MULTIPLIER_MSG({
          days: safeNumeral(calcPeriodInDays || 70, '0.0'),
          multiplier: safeNumeral(maxMultiplier || 3, '0.0'),
        }),
      },
      {
        title: 'Current Rewards',
        body: GET_CURRENT_REWARDS_MSG(),
      },
    ],
    [calcPeriodInDays],
  )

  return (
    <MyStatsContainer>
      <Header>
        <Tooltip
          classNames="my-auto ml-2 normal-case tracking-wide"
          panelClassnames="-translate-x-1/4"
          messages={getTooltipMessages()}
        />
      </Header>
      <MyStatsWrapper>
        <MyStatsBox
          name="APY"
          value={Number((apy ?? 100).toFixed(2))}
          units="%"
          interpolate={(val) => safeNumeral(val, '0.00%').slice(0, val > 100 ? -4 : -1)}
        />
        <MyStatsBox
          name="Reward Multiplier"
          value={currentMultiplier}
          units="x"
          interpolate={(val) => safeNumeral(val, '0.0')}
        />
        <MyStatsBox
          name="Current Rewards"
          value={currentReward}
          delim=" "
          units={rewardTokenSymbol}
          interpolate={(val) => safeNumeral(val, '0,0.00')}
        />
      </MyStatsWrapper>
      {/* <GeyserStatsContainer>
        <GeyserStatsBox
          name="Total Staked"
          value={currentStake * stakingTokenPrice}
          units="USD"
          interpolate={(val) => safeNumeral(val, '0,0.00')}
        />
      </GeyserStatsContainer> */}
    </MyStatsContainer>
  )
}

export const MyTotalStaked = () => {
  const {
    vaultStats: { currentStake },
  } = useContext(StatsContext)

  const {
    selectedGeyserInfo: {
      stakingTokenInfo: { price: stakingTokenPrice },
    },
  } = useContext(GeyserContext)

  return (
    <GeyserStatsBox
      name="Total Staked"
      value={currentStake * stakingTokenPrice}
      units="USD"
      interpolate={(val) => safeNumeral(val, '0,0.00')}
    />
  )
}

const MyStatsContainer = styled.div`
  ${tw`px-5 my-5 `}
`

const MyStatsWrapper = styled.div`
  ${tw`sm:grid sm:grid-cols-3 sm:pb-5`}
`

const Header = styled.h3`
  ${ResponsiveText}
  ${tw`uppercase flex text-lightGray font-medium `}
`
