//@format
//@flow

import React from "react";
import styled from "styled-native-components";
import { Platform } from "react-native";

import Button from "../components/Button";

import { authorize } from "react-native-app-auth";
import { SPOTIFY_CLIENT_ID, SPOTIBET_API_ENDPOINT } from "../consts";

const config = {
  clientId: SPOTIFY_CLIENT_ID,
  redirectUrl: `com.spotibet:${
    Platform.OS === "ios" ? "/" : "//"
  }oauthredirect`,
  scopes: ["user-read-email", "user-read-private"],
  serviceConfiguration: {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: `${SPOTIBET_API_ENDPOINT}/auth?os=${Platform.OS}`,
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
