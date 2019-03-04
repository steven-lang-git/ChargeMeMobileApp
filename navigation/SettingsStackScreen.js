import React from 'react';
import {createStackNavigator} from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';
import UserProfile from '../screens/UserProfile';
import PaymentMethods from '../screens/PaymentMethods';
import NotificationSettings from '../screens/NotificationSettings';

const SettingsStack = createStackNavigator({

    SettingsScreen: { screen: SettingsScreen, navigationOptions: {header: null}},
    UserProfile: { screen: UserProfile},
    PaymentMethods: { screen: PaymentMethods},
    NotificationSettings: {screen:NotificationSettings},
  },
  {
       initialRouteName: 'SettingsScreen',
  }
);


export default SettingsStack;
