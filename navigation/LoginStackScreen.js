import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Loading from '../screens/EntryPoints/Loading';
import Login from '../screens/EntryPoints/Login';
import CreateAccount from '../screens/EntryPoints/CreateAccount';
import UserDrawerScreen from './UserDrawerScreen';

console.log('stacklogin')
const LoginStack = createStackNavigator({
    Login: {screen: Login, navigationOptions: {gesturesEnabled: false,}},
    CreateAccount: {screen: CreateAccount, navigationOptions: {gesturesEnabled: false,}},
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

export default LoginStack;
