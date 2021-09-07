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
    userStats: { apy, currentMultiplier, maxMultiplier, currentReward },
    vaultStats: { currentStake },
    geyserStats: { calcPeriodInDays},
  } = useContext(StatsContext)


  const {
    selectedGeyserInfo: {
      rewardTokenInfo: { symbol: rewardTokenSymbol }
    },
  } = useContext(GeyserContext)

  const getTooltipMessages = useCallback(
    () => [
      {
        title: 'APY',
        body: currentStake > 0 ? GET_APY_STAKE_MSG() : GET_APY_NO_STAKE_MSG({ days: safeNumeral(calcPeriodInDays||30, '0.0') }),
      },
      {
        title: 'Reward Multiplier',
        body: GET_REWARD_MULTIPLIER_MSG({ days: safeNumeral(calcPeriodInDays||30, '0.0'), multiplier: safeNumeral(maxMultiplier||3, '0.0') }),
      },
      {
        title: 'Current Rewards',
        body: GET_CURRENT_REWARDS_MSG(),
      },
    ],
    [currentStake],
  )

  return (
    <MyStatsContainer>
      <Header>
        My Stats <Tooltip classNames="my-auto ml-2 normal-case tracking-wide" panelClassnames='-translate-x-1/4' messages={getTooltipMessages()} />
      </Header>
      <MyStatsWrapper>
        <MyStatsBox
        
          marginLeftValue = '25px'
          name="APY"
          value={Number(Number(Math.min(apy, 10000)).toFixed(2))}
          units="%"
          interpolate={(val) => safeNumeral(val, '0.00%').slice(0, val > 100 ? -4 : -1)}
        />
        <MyStatsBox
          marginLeftValue = '-5px'
          name="Reward Multiplier"
          value={currentMultiplier}
          units="x"
          interpolate={(val) => safeNumeral(val, '0.0')}
        />
        <MyStatsBox
          marginLeftValue = '-5px'
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
  
    vaultStats: { currentStake }
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
  ${tw`px-5 my-5 pr-0 border-r-2 border-lightGray`}
`

const MyStatsWrapper = styled.div`
  ${tw`sm:grid sm:grid-cols-3 sm:h-180px`}
  @media (max-width:1500px){
    grid-template-columns: repeat(3,minmax(0,1fr));
    
   

  }
 

  @media (max-width:960px){
    grid-template-columns: repeat(2,minmax(0,1fr));
    margin-top:10px;
    

  }
  @media (max-width:660px){
    grid-template-columns: repeat(1,minmax(0,1fr));
    

  }

@media only screen and (max-width: 600px) {
 
 
}


@media only screen and (min-width: 600px) {
 
}


@media only screen and (min-width: 768px) {
  
}
`

const Header = styled.h3`
  ${ResponsiveText}
  ${tw`uppercase flex text-radicalRed font-medium sm:pl-3`}
`

