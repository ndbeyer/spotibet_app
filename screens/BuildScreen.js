//@format
//@flow

import React from "react";
import Screen from "../components/Screen";
import styled from "styled-native-components";
import { useNavigation } from "react-navigation-hooks";
import Text from "../components/Text";

const BuildScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen>
      <Text>Buildscreen</Text>
    </Screen>
  );
};

export default BuildScreen;
