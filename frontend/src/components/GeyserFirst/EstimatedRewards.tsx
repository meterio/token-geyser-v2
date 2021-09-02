import styled from 'styled-components/macro'

import { useContext, useEffect, useState } from 'react'
import { StatsContext } from 'context/StatsContext'
import { formatWithDecimals } from 'utils/numeral'
import { BigNumber } from 'ethers'

import { GeyserContext } from 'context/GeyserContext'

interface Props {
  parsedUserInput: BigNumber
}

export const EstimatedRewards: React.FC<Props> = ({ parsedUserInput }) => {
  const [rewards, setRewards] = useState<string>('0.00')
  const { selectedGeyserInfo: { rewardTokenInfo: { symbol } } } = useContext(GeyserContext)
  const { computeRewardsFromAdditionalStakes, geyserStats: { calcPeriodInDays } } = useContext(StatsContext)

  useEffect(() => {
    (async () => {
      setRewards(
        parsedUserInput.isZero() ? '0.00' : formatWithDecimals(`${await computeRewardsFromAdditionalStakes(parsedUserInput)}`, 2)
      )
    })();
  }, [parsedUserInput])

  return (
    <EstimatedRewardsContainer>
    
    <RewardsTextContainer>
      
        Your Estimated Rewards : {Number(rewards).toFixed(10)} {symbol}{' '}
        <span>
          {parsedUserInput.gt(0) && calcPeriodInDays > 0 ? `in ${Number(calcPeriodInDays).toFixed(1)} day${calcPeriodInDays > 1 ? 's' : ''}` : ''}
        </span>
       
     
     
    </RewardsTextContainer>
  </EstimatedRewardsContainer>
  )
}

const EstimatedRewardsContainer = styled.div`

   
    max-height:150px;
    --tw-shadow: 0 0px 8px rgba(0,0,0,0.3);
    box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow);
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    border-width: 1px;
    --tw-border-opacity: 1;
    border-color: rgba(221,221,221,var(--tw-border-opacity));
    border-radius: 50px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-letter-spacing: 0.025em;
    -moz-letter-spacing: 0.025em;
    -ms-letter-spacing: 0.025em;
    letter-spacing: 0.025em; 
`



const RewardsTextContainer = styled.div`
margin:10px;
 
`
