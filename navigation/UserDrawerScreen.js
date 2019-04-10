import React from 'react';
import {createDrawerNavigator} from 'react-navigation';
import * as firebase from 'firebase';
import PastTransactions from '../screens/DrawerScreens/PastTransactions';
import CurrentTransactions from '../screens/DrawerScreens/CurrentTransactions';
import BillSplitStackScreen from './BillSplitStackScreen';
import FriendsList from '../screens/DrawerScreens/FriendsList';
import SettingsStackScreen from './SettingsStackScreen';
import Dashboard from '../screens/DrawerScreens/Dashboard';
import DrawerMenu from "./DrawerMenu";

const AppDrawerNavigator = createDrawerNavigator({
    Dashboard: {screen: Dashboard},
    PastTransactions: {screen:  PastTransactions},
    CurrentTransactions: {screen: CurrentTransactions},
    SettingsStackScreen: {screen: SettingsStackScreen},
    BillSplitStackScreen: {screen: BillSplitStackScreen},
    FriendsList: {screen: FriendsList},
  },
  {
    initialRouteName: 'Dashboard',
    contentComponent: DrawerMenu,
    contentOptions: {
    activeTintColor: '#35b0d2'
  }
});

export default AppDrawerNavigator;
