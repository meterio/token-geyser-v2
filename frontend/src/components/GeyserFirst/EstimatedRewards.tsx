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
  const {
    selectedGeyserInfo: {
      rewardTokenInfo: { symbol },
    },
  } = useContext(GeyserContext)
  const {
    computeRewardsFromAdditionalStakes,
    geyserStats: { calcPeriodInDays },
  } = useContext(StatsContext)

  useEffect(() => {
    ;(async () => {
      setRewards(
        parsedUserInput.isZero()
          ? '0.00'
          : formatWithDecimals(`${(await computeRewardsFromAdditionalStakes(parsedUserInput)) * 1e9}`, 2),
      )
    })()
  }, [parsedUserInput])

  return (
    <EstimatedRewardsContainer>
      Your Estimated Rewards : {rewards} {symbol}{' '}
      <span>
        {parsedUserInput.gt(0) && calcPeriodInDays > 0
          ? `in ${Number(calcPeriodInDays).toFixed(1)} day${calcPeriodInDays > 1 ? 's' : ''}`
          : ''}
      </span>
    </EstimatedRewardsContainer>
  )
}

const EstimatedRewardsContainer = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  max-height: 150px;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 10px;
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
  margin: 10px;
`
