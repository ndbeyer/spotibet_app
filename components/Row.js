import React from "react"
import styled from 'styled-native-components';

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: ${p => p.margin};
`;

const Row = ({ children, margin = "0rem" }) => {
  return <Wrapper margin={margin}>
    {children}
  </Wrapper> 
}

export default Row