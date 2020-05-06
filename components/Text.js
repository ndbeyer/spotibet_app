//@format
//@flow

import React from "react";
import styled from "styled-native-components";

const StyledText = styled.Text`
  color: ${(p) => p.color};
  font-size: 3.5rem;
`;

const Text = ({ color = "$main", label, children }) => (
  <StyledText color={color}>{label ? label : children}</StyledText>
);

export default Text;
