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

const BetVisualizerWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const GraphSection = styled.View`
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
  top: ${(p) => p.top || "0"};
  width: 100%;
  flex-direction: row;
  justify-content: center;
  /* border: 1px solid red; */
`;

const TendencyPositioner = styled.View`
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

const XBorder = styled.View`
  height: 1px;
  background-color: $neutral4;
  align-self: stretch;
  margin: ${(p) => p.margin || "0"};
`;

const BarWrapper = styled.View`
  flex-direction: column;
`;

const StyledGradient = styled(Gradient).attrs((p) => ({
  colors:
    p.currentUserWins && p.presentationType === "REPORT"
      ? [p.theme.colors.accent0, p.theme.colors.background0]
      : [p.theme.colors.neutral4, p.theme.colors.background0],
}))``;

const QuoteBar = styled.View`
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid red; */
`;

const BetStats = ({
  listeners,
  predictedListeners,
  currentListeners = 0,
  type,
  presentationType,
  endDate,
  currentUserSupports = true,
  nBarHeightMax = 10,
  nBarWidth = 7,
  startDate, // TODO: do we need this?
  quote, // TODO: this needs to be visualized
  currentUserAmount, // TODO: this needs to be visualized
  supportersAmount,
  contradictorsAmount,
}: {
  listeners?: number,
  predictedListeners?: number,
  currentListeners?: number,
  type?: "HIGHER" | "LOWER",
  presentationType?: "CREATE" | "REPORT",
  endDate?: string,
  currentUserSupports?: boolean,
  nBarHeightMax?: number,
  nBarWidth?: number,
  startDate?: string, // TODO: do we need this?
  quote?: number, // TODO: this needs to be visualized
  currentUserAmount?: number, // TODO: this needs to be visualized
  supportersAmount?: number,
  contradictorsAmount?: number,
}) => {
  console.log({ supportersAmount, contradictorsAmount, type, quote });

  predictedListeners = listeners || predictedListeners;

  const predictedIsHigher = React.useMemo(
    () => predictedListeners > currentListeners,
    [currentListeners, predictedListeners]
  );

  const userType = React.useMemo(
    () =>
      (type === "HIGHER" && currentUserSupports) ||
      (type === "LOWER" && !currentUserSupports)
        ? "HIGHER"
        : "LOWER",
    [currentUserSupports, type]
  );

  const currentUserWins = React.useMemo(
    () =>
      (!predictedIsHigher && userType === "HIGHER") ||
      (predictedIsHigher && userType === "LOWER"),
    [predictedIsHigher, userType]
  );

  const [showDifference, setShowDifference] = React.useState(false);

  return (
    <Wrapper>
      {!currentListeners || !predictedListeners || !endDate ? null : (
        <BetVisualizerWrapper onPress={() => setShowDifference((b) => !b)}>
          <GraphSection
            topPadding={
              !predictedIsHigher || (predictedIsHigher && userType === "LOWER")
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
              <StyledGradient
                presentationType={presentationType}
                currentUserWins={currentUserWins}
              />
              <Positioner top="-3rem">
                <Paragraph>{getNumberWithSuffix(currentListeners)}</Paragraph>
              </Positioner>
            </Bar>
            {showDifference || presentationType === "CREATE" ? (
              <DifferenceWrapper
                height={nBarHeightMax + "rem"}
                width={nBarWidth + "rem"}
              >
                <Paragraph size="s" margin="0.5rem 0" color="$neutral3">
                  {predictedIsHigher ? "+" : null}
                  {getNumberWithSuffix(predictedListeners - currentListeners)}
                </Paragraph>
                <Paragraph size="s" color="$neutral3">
                  {predictedIsHigher ? "+" : null}
                  {(
                    ((predictedListeners - currentListeners) /
                      currentListeners) *
                    100
                  ).toFixed()}
                  %
                </Paragraph>
              </DifferenceWrapper>
            ) : null}

            <BarWrapper>
              {userType === "HIGHER" ? (
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
                <Positioner top={userType === "LOWER" ? "-3rem" : "0"}>
                  <Paragraph>
                    {userType === "HIGHER" ? "> " : "< "}
                    {getNumberWithSuffix(predictedListeners)}
                  </Paragraph>
                </Positioner>
                {userType === "LOWER" ? (
                  <TendencyPositioner
                    height={nBarHeightMax / 2 + "rem"}
                    width={nBarWidth + "rem"}
                  >
                    <Paragraph>↓</Paragraph>
                  </TendencyPositioner>
                ) : null}
              </Bar>
            </BarWrapper>
            {showDifference && presentationType !== "CREATE" ? (
              <QuoteBar
                width={nBarWidth + "rem"}
                height={
                  predictedIsHigher
                    ? nBarHeightMax + "rem"
                    : nBarHeightMax / 2 + "rem"
                }
              >
                <XBorder margin="0 1rem" />
                <Positioner top="-2rem">
                  <Paragraph size="s" color="$neutral3">
                    {type === "HIGHER"
                      ? getNumberWithSuffix(supportersAmount)
                      : getNumberWithSuffix(contradictorsAmount)}
                  </Paragraph>
                </Positioner>
                <Positioner>
                  <Paragraph size="s" color="$neutral3">
                    {type === "HIGHER"
                      ? getNumberWithSuffix(contradictorsAmount)
                      : getNumberWithSuffix(supportersAmount)}
                  </Paragraph>
                </Positioner>
                {type !== userType ? (
                  <Paragraph size="s" color="$neutral3">
                    {(contradictorsAmount /
                      (contradictorsAmount + supportersAmount)) *
                      100}
                  </Paragraph>
                ) : (
                  <Paragraph size="s" color="$neutral3">
                    {(supportersAmount /
                      (contradictorsAmount + supportersAmount)) *
                      100}
                  </Paragraph>
                )}
              </QuoteBar>
            ) : null}
          </GraphSection>
          <XBorder />
          {endDate ? (
            <Paragraph margin="0.5rem" size="s" color="$neutral3">
              {formatDistanceToNow(new Date(endDate))}
            </Paragraph>
          ) : null}
        </BetVisualizerWrapper>
      )}
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
