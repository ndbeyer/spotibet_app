import React from 'react';
import {View} from 'react-native';
import styled from 'styled-native-components';
import Text from "./Text"

const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center; 
`

const Loading = () => (
  <Wrapper>
    <Text>Loading...</Text>
  </Wrapper>
);

export default Loading;
