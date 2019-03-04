import React from 'react';
import {createStackNavigator} from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';
import UserProfile from '../screens/UserProfile';
import PaymentMethods from '../screens/PaymentMethods';
import NotificationSettings from '../screens/NotificationSettings';
import ChangePassword from '../screens/ChangePassword';
import DeveloperGuide from '../screens/DeveloperGuide';
import UserManual from '../screens/UserManual';
import Bank from '../screens/Bank';
import CreditCard from '../screens/CreditCard';
import PushNotifications from '../screens/PushNotifications';
import TextNotifications from '../screens/TextNotifications';
import EmailNotifications from '../screens/EmailNotifications';
import FAQs from '../screens/FAQs';

const SettingsStack = createStackNavigator({

    SettingsScreen: { screen: SettingsScreen, navigationOptions: {header: null}},
    UserProfile: { screen: UserProfile},

    PaymentMethods: { screen: PaymentMethods},
    Bank: {screen: Bank},
    CreditCard: {screen: CreditCard},

    NotificationSettings: {screen: NotificationSettings},
    PushNotifications: {screen: PushNotifications},
    TextNotifications: {screen: TextNotifications},
    EmailNotifications: {screen: EmailNotifications},

    ChangePassword: {screen: ChangePassword},
    DeveloperGuide: {screen: DeveloperGuide},
    UserManual: {screen: UserManual},
    FAQs: {screen: FAQs},
  },
  {
       initialRouteName: 'SettingsScreen',
  }
);


export default SettingsStack;
