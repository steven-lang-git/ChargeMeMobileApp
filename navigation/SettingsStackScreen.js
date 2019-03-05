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
import DebitCard from '../screens/DebitCard';
import PushNotifications from '../screens/PushNotifications';
import TextNotifications from '../screens/TextNotifications';
import EmailNotifications from '../screens/EmailNotifications';
import FAQs from '../screens/FAQs';

const SettingsStack = createStackNavigator({

    SettingsScreen: { screen: SettingsScreen, navigationOptions: {header: null}},
    UserProfile: { screen: UserProfile, navigationOptions: {title: 'User Profile'}},

    PaymentMethods: { screen: PaymentMethods, navigationOptions: {title: 'Payment Methods'}},
    Bank: {screen: Bank, navigationOptions: {title: 'Add Bank'}},
    DebitCard: {screen: DebitCard, navigationOptions: {title: 'Add Debit Card'}},

    NotificationSettings: {screen: NotificationSettings, navigationOptions: {title: 'Notification Settings'}},
    PushNotifications: {screen: PushNotifications, navigationOptions: {title: 'Push Notifications'}},
    TextNotifications: {screen: TextNotifications, navigationOptions: {title: 'Text Notifications'}},
    EmailNotifications: {screen: EmailNotifications, navigationOptions: {title: 'Email Notifications'}},

    ChangePassword: {screen: ChangePassword, navigationOptions: {title: 'Change Password'}},
    DeveloperGuide: {screen: DeveloperGuide, navigationOptions: {title: 'Developer Guide'}},
    UserManual: {screen: UserManual, navigationOptions: {title: 'User Manual'}},
    FAQs: {screen: FAQs, navigationOptions: {title: 'FAQs'}},
  },
  {
       initialRouteName: 'SettingsScreen',
  }
);


export default SettingsStack;
