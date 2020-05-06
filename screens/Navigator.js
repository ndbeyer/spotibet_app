//@format
//@flow

import React from 'react';
import 'react-native-gesture-handler';
import {
  createAppContainer,
  createSwitchNavigator,
  ThemeColors,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import DashboardScreen from './DashboardScreen';
import PlaylistScreen from './PlaylistScreen';
import ArtistsScreen from './ArtistsScreen';
import ArtistScreen from './ArtistScreen';
import LoginScreen from './LoginScreen';
import FailedLogin from './FailedLogin';
import TransactionsScreen from './TransactionsScreen';
import JoinBetScreen from './JoinBetScreen';
import Header from '../components/Header';
import SplashScreen from './SplashScreen';
import BuildScreen from './BuildScreen';

import devConfig from "../dev.config"

const Navigator = createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashScreen,
      app: createBottomTabNavigator(
        {
          Dashboard: DashboardScreen,
          Create: createStackNavigator(
            {
              Playlists: PlaylistScreen,
              Artists: ArtistsScreen,
              Bet: ArtistScreen,
              JoinBet: JoinBetScreen,
            },
            {
              initialRouteName: 'Playlists',
              defaultNavigationOptions: ({navigation, screenProps}) => {
                const {theme} = screenProps || {};
                return {
                  headerTitle: () => <Header navigation={navigation} />,
                  headerStyle: {
                    backgroundColor: theme.colors.background,
                  },
                  headerTintColor: theme.colors.accent,
                  headerTitleStyle: {
                    fontSize: 16,
                  },
                };
              },
            },
          ),
          Transactions: TransactionsScreen,
          ...(devConfig.showBuildingScreen ? { Build: BuildScreen } : {})
        },
        {
          initialRouteName: devConfig.showBuildingScreen ? 'Build' : 'Create',
          headerStyle: {
            backgroundColor: '#1ed760',
          },
          tabBarOptions: {
            activeTintColor: 'black',
            labelStyle: {
              fontSize: 12,
            },
            style: {
              backgroundColor: 'white',
            },
          },
        },
      ),
      loggedOut: LoginScreen,
      failedLogin: FailedLogin,
    },
    {
      initialRouteName: 'loggedOut',
    },
  ),
);

export default Navigator;
