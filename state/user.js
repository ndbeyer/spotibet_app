//flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export const useUser = () => {
  const { data } = useQuery(
    gql`
      query currentUser {
        currentUser {
          id
          money
        }
      }
    `
  );

  return React.useMemo(() => data?.currentUser, [data]);
};
