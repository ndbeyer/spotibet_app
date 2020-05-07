//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import CardWrapper from "../components/CardWrapper";
import Text from "../components/Text";
import { BetTimer } from "../util/dateHelpers";

const RowWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TransactionCard = ({ id, type, amount, betId, datetime }) => {
  const betTimer = React.useMemo(() => new BetTimer(), []);
  return (
    <>
      <CardWrapper>
        <RowWrapper>
          <Text label={`${betTimer.formatter(datetime, "format")}`} />
          <Text label={type === "MINUS" ? "-" : "+"} />
          <Text label={amount} />
        </RowWrapper>
      </CardWrapper>
    </>
  );
};

export default TransactionCard;
