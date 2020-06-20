import client from "../util/client";
import { setToken } from "../util/token";
import { gql } from "apollo-boost";
import { Platform } from "react-native";
import { authorize } from "react-native-app-auth";

import { SPOTIFY_CLIENT_ID, SPOTIBET_API_ENDPOINT } from "../consts";
import { fetchUser } from "../state/user";

export const logout = () => {
  setToken(undefined);
  client.writeQuery({
    query: gql`
      query currentUser {
        currentUser {
          id
        }
      }
    `,
    data: { currentUser: null },
  });
};

const config = {
  clientId: SPOTIFY_CLIENT_ID,
  redirectUrl: `com.spotibet:${
    Platform.OS === "ios" ? "/" : "//"
  }oauthredirect`,
  scopes: ["user-read-email", "user-read-private"],
  serviceConfiguration: {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: `${SPOTIBET_API_ENDPOINT}/get-jwt-for-auth-code?os=${Platform.OS}`,
  },
};

export const login = async () => {
  try {
    const result = await authorize(config);
    const { error: getJwtForAuthCodeError } = result?.tokenAdditionalParameters;
    if (getJwtForAuthCodeError) {
      console.log("getJwtForAuthCodeError error", getJwtForAuthCodeError); // TODO: show Dialog
      return;
    }
    const jwt = result?.tokenAdditionalParameters?.jwt;
    if (!jwt) {
      console.log("no jwt", getJwtForAuthCodeError); // TODO: show Dialog
      return;
    }
    setToken(jwt);
    const { error: fetchUserError } = await fetchUser();
    if (fetchUserError) {
      console.log("fetchUserError error", fetchUserError); // TODO: show Dialog
      return;
    }
  } catch (e) {
    console.log("unexpected login error", e); // TODO: handle unexpected login errors
  }
};
