//@format
//@flow

import React from "react";
import styled, { useStyle } from "styled-native-components";
import Button from "./Button";

const BackgroundWrapper = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const BackgroundOverlay = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: $neutral1;
  opacity: 0.5;
`;

const Wrapper = styled.View`
  width: 80%;
  height: 80%;
  background-color: $background0;
  opacity: 1;
`;

const PositionWrapper = styled.View`
  position: absolute;
  right: 0;
  top: 0;
  margin: 2rem;
`;

const Dialog = ({ closePortal }) => {
  return (
    <BackgroundWrapper>
      <BackgroundOverlay />
      <Wrapper>
        <PositionWrapper>
          <Button onPress={closePortal} label="Close" />
        </PositionWrapper>
      </Wrapper>
    </BackgroundWrapper>
  );
};

export default Dialog;
