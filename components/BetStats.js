//@format
//@flow

import React from "react";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-native-components";
import { formatDistanceToNow, format } from "date-fns";

import { Paragraph } from "./Text";
import Gradient from "./Gradient";

import { getNumberWithSuffix } from "../util/suffix";

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  align-self: center;
  padding: ${(p) => (p.topPadding ? "3.5rem" : "0.5rem")} 0rem 0.5rem;
  margin: 0 1rem;
  flex: 1;
`;

const Bar = styled((props) =>
  props.onPress ? <TouchableOpacity {...props} /> : <View {...props} />
)`
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
  /* border: 1px solid green; */
`;

const Line = styled.View`
  height: 1px;
  background-color: $neutral4;
  align-self: stretch;
  margin: ${(p) => p.margin || "0"};
`;

const Column = styled.View`
  flex-direction: column;
`;

const StyledGradient = styled(Gradient).attrs((p) => ({
  colors: [
    p.theme.colors[p.highLightColor || "neutral4"],
    p.theme.colors.background0,
  ],
}))``;

const QuoteWrapper = styled.View`
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
`;

const LeftBar = ({
  nBarHeightMax,
  nBarWidth,
  barLeftValue,
  barRightValue,
  supportersWin,
  highlight,
}) => {
  return (
    <Bar
      height={
        barRightValue > barLeftValue
          ? nBarHeightMax / 2 + "rem"
          : nBarHeightMax + "rem"
      }
      width={nBarWidth + "rem"}
    >
      <StyledGradient
        highLightColor={
          highlight ? (supportersWin ? "accent0" : "error") : null
        }
      />
      <TextPositioner top="-3rem">
        <Paragraph>{getNumberWithSuffix(barLeftValue)}</Paragraph>
      </TextPositioner>
    </Bar>
  );
};

const viewTypes = ["absolute", "difference", "percent"];

const RightBar = ({
  type,
  barLeftValue,
  barRightValue,
  nBarHeightMax,
  nBarWidth,
}) => {
  const [index, setIndex] = React.useState(0);
  const toggleValue = React.useCallback(() => {
    setIndex((b) => (b < 2 ? b + 1 : 0));
  }, []);

  return (
    <Column>
      {type === "HIGHER" ? <Paragraph align="center">↑</Paragraph> : null}
      <Bar
        onPress={barLeftValue && barRightValue ? toggleValue : null}
        height={
          barLeftValue && barRightValue
            ? barRightValue > barLeftValue
              ? nBarHeightMax + "rem"
              : nBarHeightMax / 2 + "rem"
            : nBarHeightMax / 2 + "rem"
        }
        width={nBarWidth + "rem"}
      >
        <StyledGradient />
        <TextPositioner top={type === "LOWER" ? "-3rem" : "0"}>
          {viewTypes[index] === "absolute" ? (
            <Paragraph margin="0">
              {getNumberWithSuffix(barRightValue)}
            </Paragraph>
          ) : viewTypes[index] === "difference" ? (
            <Paragraph margin="0">
              {" "}
              {barRightValue > barLeftValue ? "+" : null}
              {getNumberWithSuffix(barRightValue - barLeftValue)}
            </Paragraph>
          ) : (
            <Paragraph margin="0">
              {barRightValue > barLeftValue ? "+" : null}
              {(
                ((barRightValue - barLeftValue) / barLeftValue) *
                100
              ).toFixed()}
              %
            </Paragraph>
          )}
        </TextPositioner>
        {type === "LOWER" ? <Paragraph align="center">↓</Paragraph> : null}
      </Bar>
    </Column>
  );
};

const Quote = ({
  nBarHeightMax,
  nBarWidth,
  type,
  barLeftValue,
  barRightValue,
  supportersAmount,
  contradictorsAmount,
  currentUserSupports,
  currentUserAmount,
  highlight,
  userWins,
}) => {
  return (
    <QuoteWrapper
      width={nBarWidth + "rem"}
      height={
        barRightValue > barLeftValue
          ? nBarHeightMax + "rem"
          : nBarHeightMax / 2 + "rem"
      }
    >
      <TextPositioner top="-2rem">
        <Paragraph size="s" color="$neutral3">
          {type === "HIGHER"
            ? getNumberWithSuffix(supportersAmount)
            : getNumberWithSuffix(contradictorsAmount)}
        </Paragraph>
        <Paragraph
          size="s"
          color={highlight ? (userWins ? "$accent0" : "$error") : "$neutral3"}
        >
          {(type === "LOWER" && !currentUserSupports) ||
          (type === "HIGHER" && currentUserSupports)
            ? ` (${Number(currentUserAmount)})`
            : null}
        </Paragraph>
      </TextPositioner>
      <Line margin="0 1rem" />
      <TextPositioner>
        <Paragraph size="s" color="$neutral3">
          {type === "LOWER"
            ? getNumberWithSuffix(supportersAmount)
            : getNumberWithSuffix(contradictorsAmount)}
        </Paragraph>
        <Paragraph
          size="s"
          color={highlight ? (userWins ? "$accent0" : "$error") : "$neutral3"}
        >
          {(type === "LOWER" && currentUserSupports) ||
          (type === "HIGHER" && !currentUserSupports)
            ? ` (${Number(currentUserAmount)})`
            : null}
        </Paragraph>
      </TextPositioner>
      {isNaN(
        supportersAmount / (contradictorsAmount + supportersAmount)
      ) ? null : (
        <Paragraph size="s" color="$neutral3">
          {(
            supportersAmount /
            (contradictorsAmount + supportersAmount)
          ).toFixed(2)}
        </Paragraph>
      )}
    </QuoteWrapper>
  );
};

const Row = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const XAxis = ({ dateLeft, dateRight }) => {
  return (
    <>
      <Line margin="0" />
      {dateLeft === "now" && dateRight ? (
        <Paragraph margin="0rem 0 0.5rem" size="s" color="$neutral3">
          {formatDistanceToNow(new Date(dateRight))}
        </Paragraph>
      ) : dateLeft && dateRight ? (
        <Row>
          <Paragraph margin="0.5rem" size="s" color="$neutral3">
            {format(new Date(dateLeft), "yyyy-MM-dd")}
          </Paragraph>
          <Paragraph margin="0.5rem" size="s" color="$neutral3">
            {format(new Date(dateRight), "yyyy-MM-dd")}
          </Paragraph>
        </Row>
      ) : !dateLeft && dateRight ? (
        <Paragraph margin="0.5rem" size="s" color="$neutral3">
          {format(new Date(dateRight), "yyyy-MM-dd")}
        </Paragraph>
      ) : null}
    </>
  );
};

const BetStats = ({
  barLeftValue,
  barRightValue,
  dateLeft,
  dateRight,
  type,
  supportersAmount,
  contradictorsAmount,
  //
  nBarHeightMax = 10,
  nBarWidth = 7,
  //
  currentUserSupports = true,
  currentUserAmount,
  //
  hideQuote,
  highlight,
}: {
  barLeftValue: number,
  barRightValue: number,
  dateLeft: "now" | string,
  dateRight: string,
  type: "HIGHER" | "LOWER",
  supportersAmount: number,
  contradictorsAmount: number,
  //
  nBarHeightMax?: number,
  nBarWidth?: number,
  //
  currentUserSupports: boolean,
  currentUserAmount: number,
  //
  hideQuote?: Boolean,
  highlight?: Boolean,
}) => {
  const [userWins, supportersWin] = React.useMemo(() => {
    const supWins =
      (type === "HIGHER" && barRightValue < barLeftValue) ||
      (type === "LOWER" && barRightValue > barLeftValue);
    const usrWins = supWins === currentUserSupports;
    return [usrWins, supWins];
  }, [currentUserSupports, barRightValue, barLeftValue, type]);

  return (
    <Wrapper topPadding={barRightValue < barLeftValue}>
      <BarContent>
        <BarSection>
          {!barLeftValue ? null : (
            <LeftBar
              nBarHeightMax={nBarHeightMax}
              nBarWidth={nBarWidth}
              barLeftValue={barLeftValue}
              barRightValue={barRightValue}
              currentUserSupports={currentUserSupports}
              type={type}
              supportersWin={supportersWin}
              highlight={highlight}
            />
          )}
          <RightBar
            type={type}
            barLeftValue={barLeftValue}
            barRightValue={barRightValue}
            nBarHeightMax={nBarHeightMax}
            nBarWidth={nBarWidth}
          />
          {hideQuote || !barLeftValue || !barRightValue ? null : (
            <Quote
              nBarHeightMax={nBarHeightMax}
              nBarWidth={nBarWidth}
              type={type}
              barLeftValue={barLeftValue}
              barRightValue={barRightValue}
              supportersAmount={supportersAmount}
              contradictorsAmount={contradictorsAmount}
              currentUserSupports={currentUserSupports}
              currentUserAmount={currentUserAmount}
              highlight={highlight}
              userWins={userWins}
            />
          )}
        </BarSection>
        <XAxis dateLeft={dateLeft} dateRight={dateRight} />
      </BarContent>
    </Wrapper>
  );
};

export default BetStats;
