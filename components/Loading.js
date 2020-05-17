import React from "react";
import styled from "styled-native-components";
import Text from "./Text";

const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Loading = () => (
  <Wrapper>
    <Text label="Loading..." />
  </Wrapper>
);

export default Loading;
