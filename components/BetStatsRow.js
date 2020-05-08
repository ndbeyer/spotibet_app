//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import Text from "./Text";
import { format } from "date-fns";

const TextBox = styled.View`
  align-items: center;
  justify-content: center;
  padding: 1rem;
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
    <TextBox>
      <Text
        label={`Started ${format(new Date(startDate), "dd.MM.yyyy HH:mm:ss")}`}
      />
      <Text label={`Quote: ${quote}`} />
      <Text
        label={`That the artist: ${
          type === "HIGHER" ? "exceeds" : "falls below"
        }`}
      />
      <Text label={listeners} />
      <Text
        label={`Ending ${format(new Date(endDate), "dd.MM.yyyy HH:mm:ss")}`}
      />
      {currentUserAmount ? (
        <Text label={`You joined this bet with: ${currentUserAmount}`} />
      ) : null}
    </TextBox>
  );
};

export default BetStatsRow;
