//@format
//@flow

import React from "react";
import styled, { useTheme } from "styled-native-components";

import Button from "../components/Button";
import Screen from "../components/Screen";
import { Label } from "../components/Text";
import Gradient from "../components/Gradient";
import { logout } from "../state/auth";

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

const GradientBox = styled.View`
  max-width: 100%;
  margin: 1rem;
  align-self: stretch;
  height: 30rem;
`;

const SettingsScreen = () => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Screen>
      <Button onPress={logout} label="Logout" />
      <GradientBox>
        <Gradient reverse />
      </GradientBox>
      {colors.accentGradient0.map((color, index) => (
        <PlaceHolder key={color} color={color}>
          <Label size="m">Gradient index: {index}</Label>
        </PlaceHolder>
      ))}
      {Object.entries(colors).map(([key, value]) => {
        return typeof value === "string" ? (
          <PlaceHolder key={key} color={value}>
            <Label size="m">{typeof key === "string" ? key : ""}</Label>
          </PlaceHolder>
        ) : null;
      })}
    </Screen>
  );
};

export default SettingsScreen;
