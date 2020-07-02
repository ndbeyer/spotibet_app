//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import Button from "../components/Button";
import Screen from "../components/Screen";
import { Heading, Label, Paragraph } from "../components/Text";

import { login } from "../state/auth";

const StyledScreen = styled(Screen).attrs({
  type: "VIEW",
})`
  justify-content: center;
`;

const LoginScreen = () => {
  const [clicked, setClicked] = React.useState(false);

  return (
    <StyledScreen>
      {!clicked ? (
        <>
          <Heading size="xl">SpotiBet</Heading>
          <Label size="m" uppercase margin="0 0 4rem">
            Good taste, good money
          </Label>
          <Button onPress={() => setClicked(true)} label="Start" />
        </>
      ) : (
        <>
          <Heading size="xl">SpotiBet</Heading>
          <Paragraph
            align="center"
            margin="1rem 4rem 1.5rem"
            size="m"
            uppercase
          >
            To use this app, it is necessary that you login with your spotify
            account. You will be asked to enter your spotify credentials in the
            next step.
          </Paragraph>

          <Button onPress={login} label="Ok" />
          <Button
            margin="0"
            backgroundColor="$background0"
            onPress={() => setClicked(false)}
            label="Cancel"
          />
        </>
      )}
    </StyledScreen>
  );
};

export default LoginScreen;
