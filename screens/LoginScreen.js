//@format
//@flow

import React from "react";
import styled from "styled-native-components";
import { Platform } from "react-native";

import Button from "../components/Button";

import { authorize } from "react-native-app-auth";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIBET_API_DEV,
  SPOTIBET_API_PROD,
} from "../consts";

const config = {
  clientId: SPOTIFY_CLIENT_ID,
  redirectUrl:
    Platform.OS === "ios"
      ? "com.spotibet:/oauthredirect"
      : "com.spotibet://oauthredirect",
  scopes: ["user-read-email", "user-read-private"],
  serviceConfiguration: {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: __DEV__
      ? `${SPOTIBET_API_DEV}/auth`
      : `${SPOTIBET_API_PROD}/auth`,
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
