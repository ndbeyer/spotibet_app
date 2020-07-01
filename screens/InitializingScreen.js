//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import Screen from "../components/Screen";
import { Paragraph } from "../components/Text";

const StyledScreen = styled(Screen)`
  justify-content: center;
`;

const InitializingScreen = () => {
  return (
    <StyledScreen>
      <Paragraph>InitializingScreen</Paragraph>
    </StyledScreen>
  );
};

export default InitializingScreen;
