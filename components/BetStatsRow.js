//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import Text from "./Text";
import BetTimer from "../util/BetTimer";

const TextBox = styled.View`
  flex: 1;
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
  console.log({
    startDate,
    endDate,
  });

  const betTimer = React.useMemo(() => new BetTimer(), []);

  return (
    <TextBox>
      <Text label={`Started ${betTimer.formatter(startDate, "format")}`} />
      <Text label={`Quote: ${quote}`} />
      <Text
        label={`That the artist: ${
          type === "HIGHER" ? "exceeds" : "falls below"
        }`}
      />
      <Text label={listeners} />
      <Text label={`Ending ${betTimer.formatter(endDate, "format")}`} />
      {currentUserAmount ? (
        <Text label={`You joined this bet with: ${currentUserAmount}`} />
      ) : null}
    </TextBox>
  );
};

export default BetStatsRow;
