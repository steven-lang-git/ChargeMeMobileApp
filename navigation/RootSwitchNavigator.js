import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import Loading from '../screens/EntryPoints/Loading';
import LoginStackScreen from './LoginStackScreen';
import UserDrawerScreen from './UserDrawerScreen';

const RootSwitch = createSwitchNavigator(
  {
    AuthLoading: Loading,
    App: UserDrawerScreen,
    Auth: LoginStackScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default RootSwitch
