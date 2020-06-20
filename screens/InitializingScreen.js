//@format
//@flow

import React from "react";
import Screen from "../components/Screen";
import styled from "styled-native-components";

const Text = styled.Text``;

const InitializingScreen = () => {
  return (
    <Screen>
      <Text>InitializingScreen</Text>
    </Screen>
  );
};

export default InitializingScreen;
