import React from "react";
import styled from "styled-native-components";

const Wrapper = styled.TouchableOpacity`
  min-width: 100px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
`;

const Label = styled.Text`
  color: ${(p) => (p.disabled ? p.colorDisabled : p.color)};
`;

const Button = ({
  label,
  loading,
  disabled,
  onPress,
  textColor = "$accentText0",
  colorDisabled = "$neutral2",
}) => {
  return (
    <Wrapper onPress={onPress} disabled={disabled}>
      <Label
        color={textColor}
        colorDisabled={colorDisabled}
        disabled={disabled || loading}
      >
        {loading ? "..." : label}
      </Label>
    </Wrapper>
  );
};

export default Button;
