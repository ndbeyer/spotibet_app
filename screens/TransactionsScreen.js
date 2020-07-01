//@format
//@flow

import React from "react";
import styled from "styled-native-components";
import { format } from "date-fns";

import Screen from "../components/Screen";
import EmptyCard from "../components/EmptyCard";
import CardWrapper from "../components/CardWrapper";
import { Paragraph } from "../components/Text";
import { useTransactions } from "../state/transaction";

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
          <Paragraph>
            {format(new Date(datetime), "dd.MM.yyyy HH:mm:ss")}
          </Paragraph>
          <Paragraph>{type === "MINUS" ? "-" : "+"}</Paragraph>
          <Paragraph>{amount}</Paragraph>
        </RowWrapper>
      </CardWrapper>
    </>
  );
};

const TransactionsScreen = () => {
  const transactions = useTransactions();

  return (
    <Screen loading={!transactions}>
      {transactions?.length ? (
        transactions.map((transaction) => {
          return <TransactionCard key={transaction.id} {...transaction} />;
        })
      ) : (
        <EmptyCard message="No transactions were found" />
      )}
    </Screen>
  );
};

export default TransactionsScreen;
