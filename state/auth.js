import client from "../util/client";
import { setToken } from "../util/token";
import { gql } from "apollo-boost";

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
