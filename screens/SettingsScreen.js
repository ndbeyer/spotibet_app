//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import Button from "../components/Button";
import Screen from "../components/Screen";
import { logout } from "../state/auth";

const StyledScreen = styled(Screen)`
  justify-content: center;
  align-items: center;
`;

const SettingsScreen = () => {
  return (
    <StyledScreen>
      <Button onPress={logout} label="Logout" />
    </StyledScreen>
  );
};

export default SettingsScreen;
