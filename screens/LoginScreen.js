//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import Button from "../components/Button";
import Screen from "../components/Screen";
import { Heading, Label } from "../components/Text";

import { login } from "../state/auth";

const StyledScreen = styled(Screen).attrs({
  type: "VIEW",
})`
  justify-content: center;
`;

const LoginScreen = () => {
  return (
    <StyledScreen>
      <Heading size="xl">SpotiBet</Heading>
      <Label size="m" uppercase margin="0 0 4rem">
        Good taste, good money
      </Label>
      <Button onPress={login} label="Start" />
    </StyledScreen>
  );
};

export default LoginScreen;
