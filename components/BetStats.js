//@format
//@flow

import React from "react";
import styled from "styled-native-components";
import { formatDistanceToNow } from "date-fns";

import { Paragraph } from "./Text";
import Gradient from "./Gradient";

import { getNumberWithSuffix } from "../util/suffix";

const Wrapper = styled.TouchableOpacity`
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
  /* border: 1px solid red; */
`;

const Bar = styled.View`
  background-color: $neutral4;
  height: ${(p) => p.height};
  width: ${(p) => p.width};
`;

const TextPositioner = styled.View`
  position: absolute;
  left: 0;
  top: ${(p) => p.top || "0"};
  width: 100%;
  flex-direction: row;
  justify-content: center;
  /* border: 1px solid red; */
`;

const DifferenceContent = styled.View`
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

const Column = styled.View`
  flex-direction: column;
`;

const StyledGradient = styled(Gradient).attrs((p) => ({
  colors:
    p.currentUserWins && p.presentationType === "REPORT"
      ? [p.theme.colors.accent0, p.theme.colors.background0]
      : [p.theme.colors.neutral4, p.theme.colors.background0],
}))``;

const QuoteContent = styled.View`
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid red; */
`;

const BarContent = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid blue; */
`;

const BarSection = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  /* border: 1px solid pink; */
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
  startDate,
  currentUserAmount,
  supportersAmount,
  contradictorsAmount,
  defaultShowDifference,
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
  startDate?: string,
  currentUserAmount?: number,
  supportersAmount?: number,
  contradictorsAmount?: number,
  defaultShowDifference?: Boolean,
}) => {
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

  const [showDifference, setShowDifference] = React.useState(
    defaultShowDifference
  );

  const handleToggleShowDifference = React.useCallback(() => {
    setShowDifference((b) => !b);
  }, []);

  return !currentListeners || !predictedListeners || !endDate ? null : (
    <Wrapper onPress={handleToggleShowDifference}>
      <GraphSection
        topPadding={
          !predictedIsHigher || (predictedIsHigher && userType === "LOWER")
        }
      >
        <BarContent>
          <BarSection>
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
              <TextPositioner top="-3rem">
                <Paragraph>{getNumberWithSuffix(currentListeners)}</Paragraph>
              </TextPositioner>
            </Bar>
            {showDifference || presentationType === "CREATE" ? (
              <DifferenceContent
                height={nBarHeightMax + "rem"}
                width={nBarWidth + "rem"}
              >
                <Paragraph size="s" color="$neutral3">
                  Δ
                </Paragraph>
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
              </DifferenceContent>
            ) : null}

            <Column>
              {userType === "HIGHER" ? (
                <Paragraph align="center">↑</Paragraph>
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
                <TextPositioner top={userType === "LOWER" ? "-3rem" : "0"}>
                  <Paragraph>
                    {/* {userType === "HIGHER" ? "> " : "< "} */}
                    {getNumberWithSuffix(predictedListeners)}
                  </Paragraph>
                </TextPositioner>
                {userType === "LOWER" ? (
                  <Paragraph align="center">↓</Paragraph>
                ) : null}
              </Bar>
            </Column>
          </BarSection>
          <XBorder margin="0" />
        </BarContent>

        {showDifference && presentationType !== "CREATE" ? (
          <QuoteContent
            width={nBarWidth + "rem"}
            height={
              predictedIsHigher
                ? nBarHeightMax + "rem"
                : nBarHeightMax / 2 + "rem"
            }
          >
            <TextPositioner top="-2rem">
              <Paragraph size="s" color="$neutral3">
                {type === "HIGHER"
                  ? getNumberWithSuffix(supportersAmount)
                  : getNumberWithSuffix(contradictorsAmount)}
                {(type === "HIGHER" && userType === type) ||
                (type === "LOWER" && userType !== type && currentUserAmount)
                  ? ` (${currentUserAmount})`
                  : null}
              </Paragraph>
            </TextPositioner>
            <XBorder margin="0 1rem" />
            <TextPositioner>
              <Paragraph size="s" color="$neutral3">
                {type === "HIGHER"
                  ? getNumberWithSuffix(contradictorsAmount)
                  : getNumberWithSuffix(supportersAmount)}
                {(type === "LOWER" && userType === type) ||
                (type === "HIGHER" && userType !== type && currentUserAmount)
                  ? ` (${currentUserAmount})`
                  : null}
              </Paragraph>
            </TextPositioner>
            {isNaN(
              supportersAmount / (contradictorsAmount + supportersAmount)
            ) ? null : type !== userType && currentUserAmount ? (
              // user contradicts
              <Paragraph size="s" color="$neutral3">
                Q:
                {contradictorsAmount / (contradictorsAmount + supportersAmount)}
              </Paragraph>
            ) : (
              <Paragraph size="s" color="$neutral3">
                Q:
                {supportersAmount / (contradictorsAmount + supportersAmount)}
              </Paragraph>
            )}
          </QuoteContent>
        ) : null}
      </GraphSection>
      {endDate ? (
        <Paragraph margin="0.5rem" size="s" color="$neutral3">
          {/* {startDate ? "ends in " : ""} */}
          {formatDistanceToNow(new Date(endDate))}
        </Paragraph>
      ) : null}
      {startDate ? (
        <Paragraph margin="0rem 0 0.5rem" size="s" color="$neutral3">
          closes in {formatDistanceToNow(new Date(startDate))}
        </Paragraph>
      ) : null}
    </Wrapper>
  );
};

export default BetStats;
