import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Loading from '../screens/Loading';
import HomeScreen from '../screens/HomeScreen';
import CreateAccount from '../screens/CreateAccount';
import UserDrawerScreen from './UserDrawerScreen';

const LoginStack = createStackNavigator({
    Loading: {screen: Loading},
    HomeScreen: {screen: HomeScreen},
    CreateAccount: {screen: CreateAccount},
    UserDrawerScreen: {screen: UserDrawerScreen},
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
