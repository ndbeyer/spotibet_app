import React from "react";
import styled from "styled-native-components";

import Loading from "../components/Loading";
import { Label } from "../components/Text";

const Wrapper = styled.TouchableOpacity`
  min-width: 10rem;
  background-color: ${(p) => p.color};
  border-width: ${(p) => (p.outline ? 1 : 0)}px;
  border-style: solid;
  border-color: ${(p) => p.color};
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
  textColor = "$accentText0",
  colorDisabled = "$neutral3",
  color = "$background1",
  light = true,
  margin = "1rem",
}) => {
  return (
    <Wrapper
      onPress={onPress}
      disabled={disabled}
      outline={outline}
      color={color}
      margin={margin}
    >
      <Label
        light={light}
        color={disabled ? colorDisabled : textColor}
        colorDisabled={colorDisabled}
        disabled={disabled || loading}
        margin="1rem"
      >
        {loading ? <Loading /> : null}
        {label}
      </Label>
    </Wrapper>
  );
};

export default Button;
