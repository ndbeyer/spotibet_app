//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import CardWrapper from "../components/CardWrapper";
import Text from "../components/Text";
import { format } from "date-fns";

const RowWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TransactionCard = ({ id, type, amount, betId, datetime }) => {
  return (
    <>
      <CardWrapper>
        <RowWrapper>
          <Text label={format(new Date(datetime), "dd.MM.yyyy HH:mm:ss")} />
          <Text label={type === "MINUS" ? "-" : "+"} />
          <Text label={amount} />
        </RowWrapper>
      </CardWrapper>
    </>
  );
};

export default TransactionCard;
