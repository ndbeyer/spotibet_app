//@format
//@flow

import React from "react";

import Screen from "../components/Screen";
import Scroll from "../components/Scroll";
import Loading from "../components/Loading";
import EmptyCard from "../components/EmptyCard";
import TransactionCard from "../components/TransactionCard";

import { useTransactions } from "../state/transaction";

const TransactionsScreen = () => {
  const transactions = useTransactions();

  return (
    <Screen>
      {!transactions ? (
        <Loading />
      ) : (
        <Scroll>
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
