//@format
//@flow

import React from "react";
import Screen from "../components/Screen";
import styled from "styled-native-components";
import { useNavigation } from "react-navigation-hooks";
import { Dimensions } from "react-native";

import delay from "../util/delay";
import devConfig from "../dev.config";
import { useUser, makeUserBetTransactions } from "../state/user";

const Image = styled.Image`
  resize-mode: contain;
  width: ${(p) => p.width * 0.8}px;
  height: ${(p) => p.width * 0.8}px;
`;

const SplashScreen = () => {
  const started = React.useRef(Date.now());
  const navigation = useNavigation();
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const [loading, setLoading] = React.useState(true);

  const user = useUser();

  React.useEffect(() => {
    (async () => {
      const { success } = await makeUserBetTransactions();
      if (!success) {
        console.log("makeUserBetTransactions not successful");
        // TODO: Show error dialog
      }
      setLoading(false);
    })();
  }, [navigation]);

  React.useEffect(() => {
    (async () => {
      if (!loading && user) {
        const difference = Date.now() - started.current;
        devConfig.delaySplashScreen && difference < 2000
          ? await delay(2000 - difference)
          : null;
        navigation.navigate("app");
      }
    })();
  }, [navigation, user, loading]);

  return (
    <Screen>
      <Image source={require("../images/splash.png")} width={SCREEN_WIDTH} />
    </Screen>
  );
};

export default SplashScreen;
