//@format
//@flow

import React from "react";
import styled, { useTheme } from "styled-native-components";

import Button from "../components/Button";
import Screen from "../components/Screen";
import Scroll from "../components/Scroll";
import { Label } from "../components/Text";
import { logout } from "../state/auth";

import { colorDefs } from "../App";

const PlaceHolder = styled.View`
  max-width: 100%;
  align-self: stretch;
  margin: 1rem;
  background-color: ${(p) => p.color};
  height: 8rem;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
`;

const SettingsScreen = () => {
  const theme = useTheme();
  console.log({ theme });
  const colors = colorDefs({ accentColor: "#34eb46" });

  return (
    <Screen>
      <Scroll>
        <Button onPress={logout} label="Logout" />
        {Object.entries(colors).map(([key, value]) => {
          return typeof value === "string" ? (
            <PlaceHolder key={key} color={value}>
              <Label size="m">{typeof key === "string" ? key : ""}</Label>
            </PlaceHolder>
          ) : null;
        })}
      </Scroll>
    </Screen>
  );
};

export default SettingsScreen;
