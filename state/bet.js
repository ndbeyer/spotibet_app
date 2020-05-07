//flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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
