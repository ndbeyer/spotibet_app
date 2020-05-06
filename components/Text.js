//@format
//@flow

import React from 'react'
import styled from 'styled-native-components';

const StyledText = styled.Text`
  color: ${p => p.color};
  font-size: 3.5rem;
`;

const Text = ({ color = "$main", label }) => <StyledText color={color}>{label}</StyledText>

export default Text
