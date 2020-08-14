//@format
//@flow

import React from "react";
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
  colors: [p.theme.colors.neutral4, p.theme.colors.background0],
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
  listenersBefore,
  listenersAfter,
}) => {
  return (
    <Bar
      height={
        listenersAfter > listenersBefore
          ? nBarHeightMax / 2 + "rem"
          : nBarHeightMax + "rem"
      }
      width={nBarWidth + "rem"}
    >
      <StyledGradient />
      <TextPositioner top="-3rem">
        <Paragraph>{getNumberWithSuffix(listenersBefore)}</Paragraph>
      </TextPositioner>
    </Bar>
  );
};

const Difference = ({
  nBarHeightMax,
  nBarWidth,
  listenersBefore,
  listenersAfter,
}) => {
  return (
    <DifferenceContent height={nBarHeightMax + "rem"} width={nBarWidth + "rem"}>
      <Paragraph size="s" color="$neutral3">
        Δ
      </Paragraph>
      <Paragraph size="s" margin="0.5rem 0" color="$neutral3">
        {listenersAfter > listenersBefore ? "+" : null}
        {getNumberWithSuffix(listenersAfter - listenersBefore)}
      </Paragraph>
      <Paragraph size="s" color="$neutral3">
        {listenersAfter > listenersBefore ? "+" : null}
        {(
          ((listenersAfter - listenersBefore) / listenersBefore) *
          100
        ).toFixed()}
        %
      </Paragraph>
    </DifferenceContent>
  );
};

const RightBar = ({
  type,
  listenersBefore,
  listenersAfter,
  nBarHeightMax,
  nBarWidth,
}) => {
  return (
    <Column>
      {type === "HIGHER" ? <Paragraph align="center">↑</Paragraph> : null}
      <Bar
        height={
          listenersAfter > listenersBefore
            ? nBarHeightMax + "rem"
            : nBarHeightMax / 2 + "rem"
        }
        width={nBarWidth + "rem"}
      >
        <StyledGradient />
        <TextPositioner top={type === "LOWER" ? "-3rem" : "0"}>
          <Paragraph>{getNumberWithSuffix(listenersAfter)}</Paragraph>
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
  listenersBefore,
  listenersAfter,
  supportersAmount,
  contradictorsAmount,
  currentUserSupports,
  currentUserAmount,
}) => {
  return (
    <QuoteWrapper
      width={nBarWidth + "rem"}
      height={
        listenersAfter > listenersBefore
          ? nBarHeightMax + "rem"
          : nBarHeightMax / 2 + "rem"
      }
    >
      <TextPositioner top="-2rem">
        <Paragraph size="s" color="$neutral3">
          {type === "HIGHER"
            ? getNumberWithSuffix(supportersAmount)
            : getNumberWithSuffix(contradictorsAmount)}
          {(type === "HIGHER" && currentUserSupports) ||
          (type === "LOWER" && !currentUserSupports)
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
          Q:
          {supportersAmount / (contradictorsAmount + supportersAmount)}
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
      ) : null}
    </>
  );
};

const BetStats = ({
  listenersBefore,
  listenersAfter,
  dateLeft = "now",
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
  hideDifference,
}: {
  listenersBefore: number,
  listenersAfter: number,
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
  hideDifference?: Boolean,
}) => {
  return !listenersBefore || !listenersAfter ? null : (
    <Wrapper topPadding={listenersAfter < listenersBefore}>
      <BarContent>
        <BarSection>
          <LeftBar
            nBarHeightMax={nBarHeightMax}
            nBarWidth={nBarWidth}
            listenersBefore={listenersBefore}
            listenersAfter={listenersAfter}
          />
          {hideDifference ? null : (
            <Difference
              listenersBefore={listenersBefore}
              listenersAfter={listenersAfter}
              nBarHeightMax={nBarHeightMax}
              nBarWidth={nBarWidth}
            />
          )}
          <RightBar
            type={type}
            listenersBefore={listenersBefore}
            listenersAfter={listenersAfter}
            nBarHeightMax={nBarHeightMax}
            nBarWidth={nBarWidth}
          />
          {hideQuote ? null : (
            <Quote
              nBarHeightMax={nBarHeightMax}
              nBarWidth={nBarWidth}
              type={type}
              listenersBefore={listenersBefore}
              listenersAfter={listenersAfter}
              supportersAmount={supportersAmount}
              contradictorsAmount={contradictorsAmount}
              currentUserSupports={currentUserSupports}
              currentUserAmount={currentUserAmount}
            />
          )}
        </BarSection>
        <XAxis dateLeft={dateLeft} dateRight={dateRight} />
      </BarContent>
    </Wrapper>
  );
};

export default BetStats;
