//@format
//@flow

import React from 'react';
import {RefreshControl} from 'react-native';
import styled from 'styled-native-components';

const ScrollWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  height: 100%;
  width: 100%;
`;

const SpacerTop = styled.View`
  height: 3rem;
`;

const SpacerBottom = styled.View`
  height: 1rem;
`;

const Scroll = ({children, onRefresh}) => {
  const handleRefresh = React.useCallback(async ()=>{
    await onRefresh()
  },[onRefresh])

  return (
    <ScrollWrapper>
      {onRefresh ? (
        <RefreshControl onRefresh={handleRefresh} />
      ) : null}
      <SpacerTop />
      {children}
      <SpacerBottom />
    </ScrollWrapper>
  );
};

export default Scroll;
