//flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import client from "../util/client";

export const useBet = (id: string) => {
  const { data } = useQuery(
    gql`
      query bet($id: ID!) {
        bet(id: $id) {
          id
          artistId
          listeners
          type
          startDate
          endDate
          quote
          currentUserAmount
          currentUserSupports
          status
          listenersAtEndDate
          artist {
            id
            name
            image
            popularity
            followers
            spotifyUrl
            monthlyListeners
          }
        }
      }
    `,
    {
      variables: {
        id: id,
      },
    }
  );

  return React.useMemo(() => data?.bet, [data]);
};

export const joinBet = async ({
  betId,
  support,
  amount,
}: {
  betId: string,
  support: boolean,
  amount: number,
}): Promise<
  | { success: true, error: null }
  | {
      success: false,
      error: any,
    }
> => {
  try {
    const { errors } = await client.mutate({
      mutation: gql`
        mutation joinBet($betId: ID!, $support: Boolean!, $amount: Int!) {
          joinBet(betId: $betId, support: $support, amount: $amount) {
            success
          }
        }
      `,
      refetchQueries: ["header", "dashboard", "transaction"],
      errorPolicy: "all",
      variables: {
        betId,
        support,
        amount,
      },
    });
    if (errors) {
      return { success: false, error: errors[0] };
    } else {
      return { success: true };
    }
  } catch (e) {
    if (e.networkError) return { success: false, error: "NETWORK_ERROR" };
    else throw e;
  }
};
