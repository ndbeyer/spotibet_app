//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import { Paragraph } from "./Text";
import { format, formatDistanceToNow } from "date-fns";

const Row = styled.View`
  margin: 1rem 2rem;
  max-width: 100%;
  flex-direction: row;
`;

const BetStatsRow = ({
  listeners,
  quote,
  type,
  startDate,
  endDate,
  currentUserAmount,
}) => {
  return (
    <>
      <Row>
        <Paragraph flex>Started</Paragraph>
        <Paragraph flex>{format(new Date(startDate), "dd.MM.yyyy")}</Paragraph>
      </Row>
      <Row>
        <Paragraph flex>Quote</Paragraph>
        <Paragraph flex>{quote ? quote : "-"}</Paragraph>
      </Row>
      <Row>
        <Paragraph flex>Listeners</Paragraph>
        <Paragraph flex>
          {type === "HIGHER" ? ">" : "<"} {listeners}
        </Paragraph>
      </Row>
      <Row>
        <Paragraph flex>Ending</Paragraph>
        <Paragraph flex>{formatDistanceToNow(new Date(endDate))}</Paragraph>
      </Row>
      {currentUserAmount ? (
        <Row>
          <Paragraph flex>Joined</Paragraph>
          <Paragraph flex>{currentUserAmount}</Paragraph>
        </Row>
      ) : null}
    </>
  );
};

export default BetStatsRow;
