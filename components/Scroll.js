//@format
//@flow

import React from "react";
import { RefreshControl } from "react-native";
import styled from "styled-native-components";

const Wrapper = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: "center",
  },
})`
  height: 100%;
  width: 100%;
`;

const Scroll = ({ children, onRefresh }) => {
  const handleRefresh = React.useCallback(async () => {
    await onRefresh();
  }, [onRefresh]);
  return (
    <Wrapper>
      {onRefresh ? <RefreshControl onRefresh={handleRefresh} /> : null}
      {children}
    </Wrapper>
  );
};

export default Scroll;
