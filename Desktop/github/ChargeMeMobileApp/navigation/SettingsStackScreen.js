import React from 'react';
import {createStackNavigator} from 'react-navigation';
import SettingsScreen from '../screens/DrawerScreens/Settings/SettingsScreen';
import UserProfile from '../screens/DrawerScreens/Settings/UserProfile';
import PaymentMethods from '../screens/DrawerScreens/Settings/Payments/PaymentMethods';
import NotificationSettings from '../screens/DrawerScreens/Settings/Notifications/NotificationSettings';
import ChangePassword from '../screens/DrawerScreens/Settings/Security/ChangePassword';
import DeveloperGuide from '../screens/DrawerScreens/Settings/Info/DeveloperGuide';
import UserManual from '../screens/DrawerScreens/Settings/Info/UserManual';
import Bank from '../screens/DrawerScreens/Settings/Payments/Bank';
import DebitCard from '../screens/DrawerScreens/Settings/Payments/DebitCard';
import PushNotifications from '../screens/DrawerScreens/Settings/Notifications/PushNotifications';
import TextNotifications from '../screens/DrawerScreens/Settings/Notifications/TextNotifications';
import EmailNotifications from '../screens/DrawerScreens/Settings/Notifications/EmailNotifications';
import FAQs from '../screens/DrawerScreens/Settings/Info/FAQs';


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
