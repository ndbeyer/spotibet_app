//@format
//@flow

import React from "react";
import Screen from "../components/Screen";
import styled from "styled-native-components";
import { useNavigation } from "react-navigation-hooks";
import { Dimensions } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import delay from "../util/delay";
import devConfig from "../dev.config";

const Image = styled.Image`
  resize-mode: contain;
  width: ${(p) => p.width * 0.8}px;
  height: ${(p) => p.width * 0.8}px;
`;

const SplashScreen = () => {
  const navigation = useNavigation();
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const [state] = React.useState(Date.now());

  // mutation
  const [runMutation, { data, loading, error }] = useMutation(
    gql`
      mutation makeUserBetTransactions {
        makeUserBetTransactions {
          success
        }
      }
    `
  );

  const { makeUserBetTransactions } = data || {};
  const { success } = makeUserBetTransactions || {};

  React.useEffect(() => {
    (async () => {
      runMutation();
    })();
  }, [navigation, runMutation]);

  React.useEffect(() => {
    (async () => {
      if (success) {
        const difference = Date.now() - state;
        devConfig.delaySplashScreen && difference < 2000
          ? await delay(2000 - difference)
          : null;
        navigation.navigate("app");
      }
    })();
  }, [success, state, navigation]);

  return (
    <Screen>
      <Image source={require("../images/splash.png")} width={SCREEN_WIDTH} />
    </Screen>
  );
};

export default SplashScreen;
