//@format
//@flow

import React from "react";
import { useTheme } from "styled-native-components";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "../components/Icon";
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

const routeIcons = {
  Dashboard: "profile",
  Create: "play",
  Transactions: "graph",
  Settings: "gear",
};

const Navigator = () => {
  const appState = useAppState();
  const theme = useTheme();
  console.log("appState", appState);

  return (
    // Navigator does not re-render too often, only if appState or theme changes
    // if Navigator will re-render, caching the options objects in this case, will make the Screens to not re-render IF the Screens return a memoized UI
    <NavigationContainer>
      {appState === "LOGGED_OUT" ? (
        <>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </>
      ) : appState === "LOGGED_IN" ? (
        <>
          <Tab.Navigator
            initialRouteName="Create"
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
            tabBarOptions={{
              showLabel: false,
            }}
            // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused }) => (
                <Icon
                  size="3rem"
                  name={routeIcons[route.name]}
                  color={
                    focused ? theme.colors.neutral0 : theme.colors.neutral4
                  }
                />
              ),
            })}
          >
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
