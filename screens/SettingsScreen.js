//@format
//@flow

import React from "react";
import styled from "styled-native-components";
import { Text } from "react-native";

import Button from "../components/Button";
import Screen from "../components/Screen";
import Logout from "../components/Logout";
import Scroll from "../components/Scroll";

import { colorDefs } from "../util/colors";

const PlaceHolder = styled.View`
  max-width: 100%;
  align-self: stretch;
  margin: 1rem;
  background-color: ${(p) => p.color};
  height: 16rem;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
`;

const SettingsScreen = () => {
  const [loggingOut, setLoggingOut] = React.useState(false);

  const colors = colorDefs({ accentColor: "#34eb46" });

  React.useEffect(() => {
    return setLoggingOut(false);
  }, []);

  return !loggingOut ? (
    <Screen>
      <Scroll>
        <Button onPress={() => setLoggingOut(true)} label="Logout" />
        {Object.entries(colors).map(([key, value]) => {
          console.log({ key });
          return typeof value === "string" ? (
            <PlaceHolder key={key} color={value}>
              <Text>{typeof key === "string" ? key : ""}</Text>
            </PlaceHolder>
          ) : null;
        })}
      </Scroll>
    </Screen>
  ) : (
    <Logout />
  );
};

export default SettingsScreen;
