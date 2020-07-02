//@format
//@flow

import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import InitializingScreen from "./InitializingScreen";
import LoginScreen from "./LoginScreen";
import DashboardScreen from "./DashboardScreen";
import PlaylistScreen from "./PlaylistScreen";
import ArtistsOfPlaylistScreen from "./ArtistsOfPlaylistScreen";
import ArtistScreen from "./ArtistScreen";
import TransactionsScreen from "./TransactionsScreen";
import JoinBetScreen from "./JoinBetScreen";
import SettingsScreen from "./SettingsScreen";

import { useUser, fetchUser } from "../state/user";
import { refreshLogin } from "../state/auth";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CreateStack = () => (
  <Stack.Navigator initialRouteName="Playlists">
    <Stack.Screen name="Playlists" component={PlaylistScreen} />
    <Stack.Screen name="Artists" component={ArtistsOfPlaylistScreen} />
    <Stack.Screen name="Artist" component={ArtistScreen} />
    <Stack.Screen name="JoinBet" component={JoinBetScreen} />
  </Stack.Navigator>
);

const useAppState = () => {
  const { currentUser, loading } = useUser();

  const [triedRefresh, setTriedRefresh] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { success } = await refreshLogin();
      if (success) {
        await fetchUser();
      }
      setTriedRefresh(true);
    })();
  }, []);

  if (loading || (!loading && !triedRefresh)) return "LOADING";
  if (currentUser) return "LOGGED_IN";
  else return "LOGGED_OUT";
};

const Navigator = () => {
  const appState = useAppState();
  console.log("appState", appState);

  return (
    <NavigationContainer>
      {appState === "LOGGED_OUT" ? (
        <>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </>
      ) : appState === "LOGGED_IN" ? (
        <>
          <Tab.Navigator initialRouteName="Create">
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Create" component={CreateStack} />
            <Tab.Screen name="Transactions" component={TransactionsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Initializing" component={InitializingScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
