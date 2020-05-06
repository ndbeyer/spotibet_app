//@format
//@flow

import React from 'react';
import styled from 'styled-native-components';
import {SafeAreaView} from 'react-native';

const ScreenWrapper = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${p => p.background ? p.background : '$background' };
`;

const Screen = ({children, background}) => {
  return (
    <SafeAreaView>
      <ScreenWrapper background={background}>
        {children}
      </ScreenWrapper>
    </SafeAreaView>
  );
};

export default Screen;
