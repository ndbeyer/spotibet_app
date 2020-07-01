import React from "react";
import styled from "styled-native-components";
import { ActivityIndicator } from "react-native";

import { Label } from "./Text";

const LoadingWrapper = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.TouchableOpacity`
  min-width: 15rem;
  background-color: ${(p) => p.backgroundColor};
  border-width: ${(p) => (p.outline ? 1 : 0)}px;
  border-style: solid;
  border-color: ${(p) => p.backgroundColor};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  margin: ${(p) => p.margin};
`;

const Button = ({
  label = "I have no label",
  outline,
  loading,
  disabled,
  onPress,
  textColor = "$neutral0",
  textColorDisabled = "$neutral2",
  backgroundColor = "$background1",
  light = true,
  margin = "1rem",
}) => {
  return (
    <Wrapper
      onPress={onPress}
      disabled={disabled}
      outline={outline}
      backgroundColor={backgroundColor}
      margin={margin}
    >
      <>
        {loading ? (
          <LoadingWrapper>
            <ActivityIndicator />
          </LoadingWrapper>
        ) : null}
        <Label
          light={light}
          color={
            disabled ? textColorDisabled : loading ? "transparent" : textColor
          }
          disabled={disabled || loading}
          margin="1rem"
        >
          {label}
        </Label>
      </>
    </Wrapper>
  );
};

export default Button;
