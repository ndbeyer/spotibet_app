//@format
//@flow

import React from "react";
import Screen from "../components/Screen";
import styled from "styled-native-components";
import { Dimensions } from "react-native";

const Image = styled.Image`
  resize-mode: contain;
  width: ${(p) => p.width * 0.8}px;
  height: ${(p) => p.width * 0.8}px;
`;

const SplashScreen = () => {
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  return (
    <Screen>
      <Image source={require("../images/splash.png")} width={SCREEN_WIDTH} />
    </Screen>
  );
};

export default SplashScreen;
