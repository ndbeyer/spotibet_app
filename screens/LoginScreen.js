//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import Button from "../components/Button";
import Screen from "../components/Screen";

import { login } from "../state/auth";

const StyledScrenn = styled(Screen)`
  justify-content: center;
`;

const LoginScreen = () => {
  return (
    <StyledScrenn type="VIEW">
      <Button onPress={login} label="Login" />
    </StyledScrenn>
  );
};

export default LoginScreen;
