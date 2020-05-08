//@format
//@flow

import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Screen from "../components/Screen";
import Scroll from "../components/Scroll";
import Loading from "../components/Loading";
import EmptyCard from "../components/EmptyCard";
import TransactionCard from "../components/TransactionCard";

const TransactionsScreen = () => {
  const { loading, data, error, refetch } = useQuery(
    gql`
      query transaction {
        currentUser {
          id
          transactions {
            id
            type
            amount
            betId
            datetime
          }
        }
      }
    `
  );

  const { currentUser } = data || {};
  const { transactions } = currentUser || {};

  return (
    <Screen>
      {loading ? (
        <Loading />
      ) : (
        <Scroll onRefresh={refetch}>
          {transactions.length ? (
            transactions.map((transaction) => {
              return <TransactionCard key={transaction.id} {...transaction} />;
            })
          ) : (
            <EmptyCard message="No transactions were found" />
          )}
        </Scroll>
      )}
    </Screen>
  );
};

export default TransactionsScreen;
