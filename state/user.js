//flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { BetInfoFragment } from "./bet";
import { TransactionInfoFragment } from "./transaction";
import client from "../util/client";

export const useUser = () => {
  const { data } = useQuery(
    gql`
      query currentUser {
        currentUser {
          id
          money
          spotify_profile_id
          bets {
            ...BetInfoFragment
          }
          transactions {
            ...TransactionInfoFragment
          }
        }
      }
      ${TransactionInfoFragment}
      ${BetInfoFragment}
    `
  );

  return React.useMemo(() => data?.currentUser, [data]);
};

export const makeUserBetTransactions = async () => {
  try {
    const { errors } = await client.mutate({
      mutation: gql`
        mutation makeUserBetTransactions {
          makeUserBetTransactions {
            success
          }
        }
      `,
    });
    if (errors) {
      return { success: false, error: errors[0] };
    }
    return { success: true };
  } catch (e) {
    if (e.networkError) return { success: false, error: "NETWORK_ERROR" };
    else throw e;
  }
};
