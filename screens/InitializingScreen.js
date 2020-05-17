//@format
//@flow

import React from "react";
import Screen from "../components/Screen";
import styled from "styled-native-components";

import { useUser } from "../state/user";
import client from "../util/client";
import { gql } from "apollo-boost";

const Text = styled.Text``;

const InitializingScreen = () => {
  const { currentUser, loading } = useUser();

  React.useEffect(() => {
    if (!loading && !currentUser) {
      client.writeQuery({
        query: gql`
          query {
            appState
          }
        `,
        data: { appState: "LOGGED_OUT" },
      });
    }
  }, [currentUser, loading]);

  console.log("currentUser", currentUser);

  return (
    <Screen>
      <Text>InitializingScreen</Text>
    </Screen>
  );
};

export default InitializingScreen;
