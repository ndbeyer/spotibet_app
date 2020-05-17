//@format
//@flow

import React from "react";

import Button from "../components/Button";
import Screen from "../components/Screen";
import Logout from "../components/Logout";

const SettingsScreen = () => {
  const [loggingOut, setLoggingOut] = React.useState(false);

  React.useEffect(() => {
    return setLoggingOut(false);
  }, []);

  return !loggingOut ? (
    <Screen>
      <Button onPress={() => setLoggingOut(true)} label="Logout" />
    </Screen>
  ) : (
    <Logout />
  );
};

export default SettingsScreen;
