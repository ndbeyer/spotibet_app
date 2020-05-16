import React from "react";
import client from "../util/client";
import { getToken, setToken } from "../util/token";
import { gql } from "apollo-boost";
import { useUser, makeUserBetTransactions } from "../state/user";

export const logout = () => {
  setToken(undefined);
  client.writeQuery({
    query: gql`
      query currentUser {
        currentUser {
          id
        }
      }
    `,
    data: { currentUser: null },
  });
};

export const useAppState = () => {
  const { currentUser, loading } = useUser();
  console.log("currentUser", currentUser);

  const [updatedUser, setUpdatedUser] = React.useState(false);
  React.useEffect(() => {
    if (currentUser) {
      (async () => {
        const started = Date.now();
        const { success } = await makeUserBetTransactions();
        if (!success) {
          console.log("makeUserBetTransactions not successful");
          // TODO: Show error dialog
        }
        const difference = Date.now() - started;
        setTimeout(() => {
          setUpdatedUser(true);
        }, Math.max(2000 - difference, 0));
      })();
    }
  }, [currentUser]);

  console.log({ loading, updatedUser, currentUser });

  if (loading || (currentUser && !updatedUser)) return "LOADING";
  if (currentUser) return "LOGGED_IN";
  return "LOGGED_OUT";
};
