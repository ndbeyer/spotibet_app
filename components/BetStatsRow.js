//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import { Paragraph } from "./Text";
import { format } from "date-fns";

const Center = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
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
    <Center>
      <Paragraph>{`Started ${format(
        new Date(startDate),
        "dd.MM.yyyy HH:mm:ss"
      )}`}</Paragraph>
      <Paragraph>{`Quote: ${quote}`}</Paragraph>
      <Paragraph>{`That the artist: ${
        type === "HIGHER" ? "exceeds" : "falls below"
      }`}</Paragraph>
      <Paragraph>{listeners}</Paragraph>
      <Paragraph>{`Ending ${format(
        new Date(endDate),
        "dd.MM.yyyy HH:mm:ss"
      )}`}</Paragraph>
      {currentUserAmount ? (
        <Paragraph>{`You joined this bet with: ${currentUserAmount}`}</Paragraph>
      ) : null}
    </Center>
  );
};

export default BetStatsRow;
