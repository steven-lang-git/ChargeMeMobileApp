import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Loading from '../screens/Loading';
import HomeScreen from '../screens/HomeScreen';
import CreateAccount from '../screens/CreateAccount';
import UserDrawerScreen from './UserDrawerScreen';

const LoginStack = createStackNavigator({
    Loading: {screen: Loading, navigationOptions: {gesturesEnabled: false,}},
    HomeScreen: {screen: HomeScreen, navigationOptions: {gesturesEnabled: false,}},
    CreateAccount: {screen: CreateAccount, navigationOptions: {gesturesEnabled: false,}},
    UserDrawerScreen: {screen: UserDrawerScreen, navigationOptions: {gesturesEnabled: false,}},
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

export default LoginStack;
