import styled from 'styled-components/macro'
import tw from 'twin.macro'
import { useContext } from 'react'
import { StatsContext } from 'context/StatsContext'
import { GeyserContext } from 'context/GeyserContext'
import { safeNumeral } from 'utils/numeral'
import { ToggleView } from 'components/ToggleView'
import { ResponsiveText } from 'styling/styles'
import {
  BrowserView
} from "react-device-detect"
import { GeyserStatsBox } from './GeyserStatsBox'
import {GeyserStakeView} from './GeyserStakeView'
import { DAY_IN_SEC } from '../../constants'
import {MyTotalStaked} from './MyStats'



export const GeyserStats = () => {
 
  const { geyserStats: { duration, totalDeposit, totalRewards }} = useContext(StatsContext)
  

  const { isStakingAction, toggleStakingAction, selectedGeyserInfo: { rewardTokenInfo: { symbol } } } = useContext(GeyserContext)

  return (
    
    <GeyserStatsContainer >
      <Header>Farm Stats</Header>
     
     <MyStatsWrapper>
     <GeyserStatsBoxContainer >
     <MyTotalStaked/>
     </GeyserStatsBoxContainer >

      <GeyserStatsBoxContainer >
        <GeyserStatsBox
          name="Program Duration"
          value={duration / DAY_IN_SEC}
          units="days left"
          interpolate={(val) => safeNumeral(val, '0.0')}
        />
      </GeyserStatsBoxContainer>
      <GeyserStatsBoxContainer >
        <GeyserStatsBox
          name="Total Deposits"
          value={totalDeposit}
          units="USD"
          interpolate={(val) => safeNumeral(val, '0,0.00')}
        />
      </GeyserStatsBoxContainer>
      <GeyserStatsBoxContainer >
        <GeyserStatsBox
          name="Total Rewards"
          value={totalRewards}
          units={symbol}
          interpolate={(val) => safeNumeral(val, '0,0.00')}
        />
      </GeyserStatsBoxContainer>
      
      </MyStatsWrapper>
      <BrowserView>
      <GeyserStatsBoxContainer >
      
          
       
      <GeyserStakeView/>
     
      <b >TOGGLE STAKE / UNSTAKE</b>
    
    
      <ToggleView enabled={isStakingAction} toggle={toggleStakingAction} options={['Stake', 'Unstake']} />
   
      </GeyserStatsBoxContainer>
      </BrowserView>
    </GeyserStatsContainer>
  )
}

const MyStatsWrapper = styled.div`
  ${tw`sm:grid sm:grid-cols-4 sm:h-80px`};

  @media (max-width:1500px){
    grid-template-columns: repeat(2,minmax(0,1fr));
    height: 180px;

  }

  @media (max-width:960px){
    grid-template-columns: repeat(2,minmax(0,1fr));
    height: 180px;

  }
  @media (max-width:660px){
    grid-template-columns: repeat(1,minmax(0,1fr));
    height: 300px;

  }

@media only screen and (max-width: 600px) {
 
 
}


@media only screen and (min-width: 600px) {
 
}


@media only screen and (min-width: 768px) {
  
}

`


const GeyserStatsContainer = styled.div`
  ${tw`px-5 my-5 pr-0`};


`

const Header = styled.h3`
  ${ResponsiveText}
  ${tw`uppercase flex font-medium text-radicalRed`}
  ${tw`sm:pl-3`}
`

const GeyserStatsBoxContainer = styled.div`
  ${tw`mt-4`}
  ${tw`sm:mt-3`}
`
