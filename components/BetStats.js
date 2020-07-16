//@format
//@flow

import React from "react";
import styled from "styled-native-components";
import { formatDistanceToNow } from "date-fns";

import { Paragraph } from "./Text";
import Gradient from "./Gradient";

import { getNumberWithSuffix } from "../util/suffix";

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const BetVisualizerWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const BarRowWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  align-self: center;
  padding: ${(p) => (p.topPadding ? "3rem" : "0rem")} 0rem 0.5rem;
`;

const Bar = styled.View`
  background-color: $neutral4;
  height: ${(p) => p.height};
  width: ${(p) => p.width};
`;

const Positioner = styled.View`
  position: absolute;
  left: 0;
  top: ${(p) => (p.textAboveBar ? "-2.75rem" : "0")};
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const TendencyPositioner = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DifferenceWrapper = styled.View`
  height: ${(p) => p.height};
  width: ${(p) => p.width};
  justify-content: center;
  align-items: center;
`;

const XAxis = styled.View`
  height: 1px;
  background-color: $neutral4;
  align-self: stretch;
`;

const BarWrapper = styled.View`
  flex-direction: column;
`;

const StyledGradient = styled(Gradient).attrs((p) => ({
  colors: [p.theme.colors.neutral4, p.theme.colors.background0],
}))``;

const BetVisualizer = ({
  predictedListeners,
  currentListeners,
  nBarHeightMax = 10,
  nBarWidth = 7,
  type,
  endDate,
}) => {
  const predictedIsHigher = React.useMemo(
    () => predictedListeners > currentListeners,
    [currentListeners, predictedListeners]
  );

  return (
    <BetVisualizerWrapper>
      <BarRowWrapper
        topPadding={
          !predictedIsHigher || (predictedIsHigher && type === "LOWER")
        }
      >
        <Bar
          height={
            predictedIsHigher
              ? nBarHeightMax / 2 + "rem"
              : nBarHeightMax + "rem"
          }
          width={nBarWidth + "rem"}
        >
          <StyledGradient />
          <Positioner textAboveBar>
            <Paragraph>{getNumberWithSuffix(currentListeners)}</Paragraph>
          </Positioner>
        </Bar>
        <DifferenceWrapper
          height={nBarHeightMax + "rem"}
          width={nBarWidth + "rem"}
        >
          <Paragraph size="s" margin="0 0 0.5rem 0" color="$neutral3">
            {predictedIsHigher ? "+" : null}
            {getNumberWithSuffix(predictedListeners - currentListeners)}
          </Paragraph>
          <Paragraph size="s" color="$neutral3">
            {predictedIsHigher ? "+" : null}
            {(
              ((predictedListeners - currentListeners) / currentListeners) *
              100
            ).toFixed()}
            %
          </Paragraph>
        </DifferenceWrapper>
        <BarWrapper>
          {type === "HIGHER" ? (
            <TendencyPositioner
              height={nBarHeightMax / 2 + "rem"}
              width={nBarWidth + "rem"}
            >
              <Paragraph>↑</Paragraph>
            </TendencyPositioner>
          ) : null}
          <Bar
            height={
              predictedIsHigher
                ? nBarHeightMax + "rem"
                : nBarHeightMax / 2 + "rem"
            }
            width={nBarWidth + "rem"}
          >
            <StyledGradient />
            <Positioner textAboveBar={type === "LOWER"}>
              <Paragraph>{getNumberWithSuffix(predictedListeners)}</Paragraph>
            </Positioner>
            {type === "LOWER" ? (
              <TendencyPositioner
                height={nBarHeightMax / 2 + "rem"}
                width={nBarWidth + "rem"}
              >
                <Paragraph>↓</Paragraph>
              </TendencyPositioner>
            ) : null}
          </Bar>
        </BarWrapper>
      </BarRowWrapper>
      <XAxis />
      <Paragraph margin="0.5rem" size="s" color="$neutral3">
        {formatDistanceToNow(new Date(endDate))}
      </Paragraph>
    </BetVisualizerWrapper>
  );
};

const BetStats = ({
  listeners,
  currentListeners = 0,
  type,
  startDate,
  endDate,
  quote, // TODO: this needs to be visualized
  currentUserAmount, // TODO: this needs to be visualized
}) => {
  return (
    <Wrapper>
      <BetVisualizer
        predictedListeners={listeners}
        currentListeners={currentListeners}
        type={type}
        startDate={startDate}
        endDate={endDate}
      />
      {/* <Row>
        <Paragraph flex>Quote</Paragraph>
        <Paragraph flex>{quote ? quote : "-"}</Paragraph>
      </Row>
      {currentUserAmount ? (
        <Row>
          <Paragraph flex>Joined</Paragraph>
          <Paragraph flex>{currentUserAmount}</Paragraph>
        </Row>
      ) : null} */}
    </Wrapper>
  );
};

export default BetStats;
