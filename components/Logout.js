//@format
//@flow

import React from "react";

import Screen from "./Screen";
import Loading from "./Loading";
import WebViewer from "./WebViewer";

import { logout } from "../state/auth";

const style = {
  display: "none",
};

const Logout = () => {
  const handleNavigationStateChange = React.useCallback(({ url }) => {
    if (url.includes("accounts.spotify.com/de/status")) {
      logout();
    }
  }, []);

  return (
    <Screen>
      <WebViewer
        style={style}
        containerStyle={style}
        uri="https://accounts.spotify.com/de/logout"
        onNavigationStateChange={handleNavigationStateChange}
      />
      <Loading />
    </Screen>
  );
};

export default Logout;
