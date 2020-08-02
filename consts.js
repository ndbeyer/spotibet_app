import { Platform } from "react-native";

export const SPOTIFY_CLIENT_ID = "5a8deb6692a34a738cf9386d357a7208";
export const SPOTIBET_API_ENDPOINT = __DEV__
  ? Platform.OS === "ios"
    ? "http://localhost:4000"
    : "http://10.0.2.2:4000"
  : "https://spotibet-api.herokuapp.com";
