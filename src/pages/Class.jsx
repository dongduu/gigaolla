import React, { useState } from 'react'
import styled from 'styled-components'

import Navigation from '../components/Navigation'
import SummaryCard from '../components/SummaryCard'
import AttendChartWrap from '../components/AttendChartWrap'
import MaxScoreWrap from '../components/MaxScoreWrap'
import AverageChartWrap from '../components/AverageChartWrap'
import DistributionChartWrap from '../components/distribution_chart/DistributionChartWrap'
import DistributionChartTab from '../components/distribution_chart/DistributionChartTap'
import SortBySubjectWrap from '../components/distribution_chart/SortBySubjectWrap'

const Class = () => {
  // 점수대별 인원 전체 / 과목별 버튼
  const [distributionTotal, setDistributionTotal] = useState(true)

  // 전체 페이지 Wrap
  const Background = styled.div`
    width: 100%;
  `
  // 네비게이션 제외 내용 Wrap
  const Cont = styled.div`
    margin-bottom: 7.63em;
    margin-left: 19.69em;
    padding: 0 2.5em;
  `
  // 상단 '00직, 목표 점수 달성도가~' 전체 wrap
  const MessageCont = styled.div`
    width: 82.81em;
    height: 5em;
    margin: 7.5em auto 0;
    background: #214680;
    border-radius: 16px;
  `
  // MessageText 가운데 정렬을 위한 wrap
  const Message = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  // '00직, 목표 점수 달성도가~' text
  const MessageText = styled.span`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: bold;
    font-size: 2em;
    color: #fff;
    line-height: 2.75rem;
  `
  // 재학생, 응시생, 응시율, 상위 카드 wrap
  const SummaryCardCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3.75em;
  `
  // 차트 wrap
  const ChartCont = styled.div`
    position: relative;
    max-width: 82.5em;
    margin: 0 auto;
    padding-top: 5em;
  `
  // 차트 Title
  const ChartName = styled.div`
    font-weight: bold;
    font-size: 1.63em;
    line-height: 2.19rem;
    margin-bottom: 3.13rem;
  `
  const DistributionChartName = styled(ChartName)`
    margin-bottom: 1rem;
  `
  // 점수지표 차트 wrap
  const Chart2 = styled.div`
    display: flex;
  `
  return (
    <Background>
      <Navigation />
      <Cont>
        <MessageCont>
          <Message>
            <MessageText>
              경찰직, 목표 점수 달성도가 90%가 넘은 학생은 N명이며 저번 시험 대비 N%
              올랐습니다.
            </MessageText>
          </Message>
        </MessageCont>
        <SummaryCardCont>
          <SummaryCard Title={'재학생'} />
          <SummaryCard Title={'응시생'} />
          <SummaryCard Title={'응시율'} />
          <SummaryCard Title={'10%'} />
        </SummaryCardCont>
        <ChartCont>
          <ChartName>응시지표</ChartName>
          <AttendChartWrap />
        </ChartCont>
        <ChartCont>
          <ChartName>점수지표</ChartName>
          <Chart2>
            <MaxScoreWrap />
            <AverageChartWrap />
          </Chart2>
        </ChartCont>
        <ChartCont>
          <DistributionChartName>
            <span>점수대별 인원수</span>
            <DistributionChartTab setDistributionTotal={setDistributionTotal} />
          </DistributionChartName>
          {distributionTotal ? <DistributionChartWrap /> : <SortBySubjectWrap />}
        </ChartCont>
      </Cont>
    </Background>
  )
}

export default Class
