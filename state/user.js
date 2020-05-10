//flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { BetInfoFragment } from "./bet";
import { TransactionInfoFragment } from "./transaction";

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
