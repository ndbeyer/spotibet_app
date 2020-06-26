import client from "../util/client";
import { setToken } from "../util/token";
import { gql } from "apollo-boost";
import { Platform } from "react-native";
import { authorize } from "react-native-app-auth";
import SecureStorage from "react-native-secure-storage";

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
    const { jwt } = result?.tokenAdditionalParameters;
    if (!jwt) {
      console.log("no jwt", getJwtForAuthCodeError); // TODO: show Dialog
      return;
    }
    setToken(jwt);

    const { refreshToken } = result?.tokenAdditionalParameters;
    if (refreshToken) await SecureStorage.setItem("refreshToken", refreshToken);

    const { error: fetchUserError } = await fetchUser();
    if (fetchUserError) {
      console.log("fetchUserError error", fetchUserError); // TODO: show Dialog
      return;
    }
    // else: currentUser will be in cache and the loggedIn appState will be shown
  } catch (e) {
    console.log("unexpected login error", e); // TODO: handle unexpected login errors
  }
};

export const refreshLogin = async () => {
  try {
    setToken(null);
    const refreshToken = await SecureStorage.getItem("refreshToken");
    if (!refreshToken) {
      return { success: false, error: "NO_REFRESH_TOKEN_IN_STORAGE" };
    }
    const { data, errors } = await client.mutate({
      mutation: gql`
        mutation JwtForRefreshToken($refreshToken: ID!) {
          jwtForRefreshToken(refreshToken: $refreshToken) {
            success
            jwt
            refreshToken
          }
        }
      `,
      variables: { refreshToken },
      errorPolicy: "all",
    });
    if (errors) {
      return { success: false, error: errors[0].message };
    }
    setToken(data.jwtForRefreshToken.jwt);
    await SecureStorage.setItem(
      "refreshToken",
      data.jwtForRefreshToken.refreshToken
    );
    return {
      success: true,
    };
  } catch (e) {
    if (e.networkError) return { success: false, error: "NETWORK_ERROR" };
    throw e;
  }
};
