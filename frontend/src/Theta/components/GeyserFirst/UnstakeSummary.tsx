import { useContext, useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import tw from 'twin.macro'
import { BigNumber } from 'ethers'
import { formatWithDecimals, formatWithPrecision } from '../../utils/numeral'
import { amountOrZero } from '../../utils/amount'
import { GeyserContext } from '../../context/GeyserContext'
import { StatsContext } from '../../context/StatsContext'
// import { CardValue, CardLabel } from 'styling/styles'



interface Props {
  userInput: string
  parsedUserInput: BigNumber
}

export const UnstakeSummary: React.FC<Props> = ({ userInput, parsedUserInput }) => {
  const {
    selectedGeyserInfo: {
      rewardTokenInfo: { symbol: rewardTokenSymbol },
      stakingTokenInfo: { symbol: stakingTokenSymbol },
    },
  } = useContext(GeyserContext)
  const { computeRewardsFromUnstake } = useContext(StatsContext)

  const [rewardAmount, setRewardAmount] = useState<string>('0.00')

  useEffect(() => {
    ;(async () => {
      setRewardAmount(formatWithDecimals(`${await computeRewardsFromUnstake(parsedUserInput)}`, 2))
    })()
  }, [parsedUserInput])

  return amountOrZero(userInput) > 0 ? (
    <Container>
      <div>
        Amount to Unstake:
        <EmphasisContainer>
          <Amount>{`${formatWithPrecision(amountOrZero(userInput).toString(), 6)} `}</Amount>
          <span>{stakingTokenSymbol}</span>
        </EmphasisContainer>
      </div>
      <div>
        Rewards to Claim:
        <EmphasisContainer>
          <Amount>{`${formatWithPrecision(rewardAmount, 8)} `}</Amount>
          <span>{rewardTokenSymbol}</span>
        </EmphasisContainer>
      </div>
      {/*
      <SummaryCard>
        <Content>
          <Label>
          </Label>
          <Value>
            <Amount>{`${formatWithDecimals(amountOrZero(userInput).toString(), 2)} `}</Amount>
            <span>{stakingTokenSymbol}</span>
          </Value>
        </Content>
      </SummaryCard>
      <SummaryCard>
        <Content>
          <Label>
            Rewards to Claim
          </Label>
          <Value>
            <Amount>{`${rewardAmount} `}</Amount>
            <span>{rewardTokenSymbol}</span>
          </Value>
        </Content>
      </SummaryCard>
      */}
    </Container>
  ) : (
    <Container />
  )
}

const Container = styled.div`
  ${tw`gap-x-4 my-4`}
  text-align: left;
  font-size: 1.1rem;
  line-height: 1.8rem;
`

const EmphasisContainer = styled.span`
  ${tw`pl-2`}
  font-weight: bold;
`

// const SummaryCard = styled.div`
//   ${tw`h-120px shadow-all-xs border border-lightGray rounded flex flex-col my-auto tracking-wide`}
// `

// const Label = styled(CardLabel)`
//   ${tw`text-sm sm:text-base text-left`}
// `

// const Value = styled(CardValue)`
//   ${tw`text-sm sm:text-base flex-wrap text-left`}
// `

const Amount = styled.span`
  ${tw`whitespace-pre-wrap`}
`

// const Content = styled.div`
//   ${tw`flex flex-col my-auto ml-4`}
// `
