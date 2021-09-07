import styled from 'styled-components/macro'
import tw from 'twin.macro'
import { useContext } from 'react'
import { StatsContext } from 'context/StatsContext'
import { GeyserContext } from 'context/GeyserContext'
import { safeNumeral } from 'utils/numeral'
import { ToggleView } from 'components/ToggleView2'
// import { ResponsiveText } from 'styling/styles'
import { BrowserView } from 'react-device-detect'
import { GeyserStatsBox } from './GeyserStatsBox'
import { GeyserStakeView } from './GeyserStakeView'
import { DAY_IN_SEC } from '../../constants'

export const GeyserStats = () => {
  const {
    geyserStats: { duration, totalDeposit, totalRewards },
  } = useContext(StatsContext)

  const {
    isStakingAction,
    toggleStakingAction,
    selectedGeyserInfo: {
      rewardTokenInfo: { symbol },
    },
  } = useContext(GeyserContext)

  return (
    <GeyserStatsContainer>
      <BrowserView>
        <ToggleContainer>
          <ToggleView enabled={isStakingAction} toggle={toggleStakingAction} options={['Stake', 'Unstake']} />
        </ToggleContainer>

        <MyStatsWrapper>
          {/* <GeyserStatsBoxContainer> */}
          {/* <MyTotalStaked /> */}
          {/* </GeyserStatsBoxContainer> */}

          <GeyserStatsBoxContainer>
            <GeyserStatsBox
              name="Program Duration"
              value={duration / DAY_IN_SEC}
              units="days left"
              interpolate={(val) => safeNumeral(val, '0.0')}
            />
          </GeyserStatsBoxContainer>
          <GeyserStatsBoxContainer>
            <GeyserStatsBox
              name="Total Deposits"
              value={totalDeposit}
              units="USD"
              interpolate={(val) => safeNumeral(val, '0,0.00')}
            />
          </GeyserStatsBoxContainer>
          <GeyserStatsBoxContainer>
            <GeyserStatsBox
              name="Total Rewards"
              value={totalRewards}
              units={symbol}
              interpolate={(val) => safeNumeral(val, '0,0.00')}
            />
          </GeyserStatsBoxContainer>
        </MyStatsWrapper>
        <GeyserStatsBoxContainer>
          <GeyserStakeView />

          {/* <b>TOGGLE STAKE / UNSTAKE</b> */}

          {/* <ToggleView enabled={isStakingAction} toggle={toggleStakingAction} options={['Stake', 'Unstake']} /> */}
        </GeyserStatsBoxContainer>
      </BrowserView>
    </GeyserStatsContainer>
  )
}

const MyStatsWrapper = styled.div`
  ${tw`sm:grid sm:grid-cols-3 mb-8`};
  justify-items: center;
  align-items: center;
  @media (max-width: 1500px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 660px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media only screen and (max-width: 600px) {
  }

  @media only screen and (min-width: 600px) {
  }

  @media only screen and (min-width: 768px) {
  }
`

const GeyserStatsContainer = styled.div`
  ${tw`px-5 my-5`};
`

// const Header = styled.h3`
//   ${ResponsiveText}
//   ${tw`uppercase flex font-medium text-lightGray mt-8`}
// `

const GeyserStatsBoxContainer = styled.div`
  ${tw`mt-4`}
  ${tw`sm:mt-3`}
`
const ToggleContainer = styled.div`
  ${tw`m-5 mt-10 mb-3`}
`
