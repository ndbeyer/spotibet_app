//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import Button from "../components/Button";

import { authorize } from "react-native-app-auth";
import { clientId, clientSecret } from "../config/keys";

const config = {
  clientId,
  clientSecret,
  redirectUrl: "com.spotibet:/oauthredirect",
  scopes: ["user-read-email", "user-read-private"],
  serviceConfiguration: {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  },
};

const LoginScreen = () => {
  const handleLogin = React.useCallback(async () => {
    try {
      const result = await authorize(config);
      console.log("result", result);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return <Button onPress={handleLogin} label="Login" />;
};

export default LoginScreen;
