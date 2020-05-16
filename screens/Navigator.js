//@format
//@flow

import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styled from "styled-native-components";

import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";
import DashboardScreen from "./DashboardScreen";
import PlaylistScreen from "./PlaylistScreen";
import ArtistsOfPlaylistScreen from "./ArtistsOfPlaylistScreen";
import ArtistScreen from "./ArtistScreen";
import TransactionsScreen from "./TransactionsScreen";
import JoinBetScreen from "./JoinBetScreen";
import Button from "../components/Button";
import FailedLogin from "./FailedLogin";
import BuildScreen from "./BuildScreen";

import { logout, useAppState } from "../state/auth";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const headerLeft = () => ({
  headerLeft: () => <Button onPress={logout} label="Logout" />,
});

const CreateStack = () => (
  <Stack.Navigator initialRouteName="Playlists">
    <Stack.Screen
      name="Playlists"
      component={PlaylistScreen}
      options={headerLeft}
    />
    <Stack.Screen name="Artists" component={ArtistsOfPlaylistScreen} />
    <Stack.Screen name="Artist" component={ArtistScreen} />
    <Stack.Screen name="JoinBet" component={JoinBetScreen} />
  </Stack.Navigator>
);

const Navigator = () => {
  const appState = useAppState();
  console.log("appState", appState);

  return (
    <NavigationContainer>
      {appState === "LOGGED_OUT" ? (
        <>
          <Stack.Navigator>
            <Stack.Screen name="loggedOut" component={LoginScreen} />
          </Stack.Navigator>
        </>
      ) : appState === "LOGGED_IN" ? (
        <>
          <Tab.Navigator initialRouteName="Create">
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Create" component={CreateStack} />
            <Tab.Screen name="Transactions" component={TransactionsScreen} />
          </Tab.Navigator>
        </>
      ) : appState === "LOADING" ? (
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
      ) : null}
    </NavigationContainer>
  );
};

export default Navigator;
