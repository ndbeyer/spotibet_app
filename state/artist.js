// flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
// import client from "../util/client";

export const useArtistsOfPlaylist = (id) => {
  const { data } = useQuery(
    gql`
      query artistsOfPlaylist($playlistId: ID!) {
        artistsOfPlaylist(playlistId: $playlistId) {
          id
          name
          image
        }
      }
    `,
    {
      variables: {
        playlistId: id,
      },
    }
  );

  return React.useMemo(() => data?.artistsOfPlaylist, [data]);
};

export const useArtist = (id) => {
  const { data } = useQuery(
    gql`
      query artist($id: ID!) {
        artist(id: $id) {
          id
          name
          image
          popularity
          followers
          monthlyListeners
          spotifyUrl
          joinableBets {
            id
            quote
            listeners
            type
            startDate
            endDate
            currentUserAmount
          }
        }
      }
    `,
    {
      variables: {
        id,
      },
    }
  );

  return React.useMemo(() => data?.artist, [data]);
};
