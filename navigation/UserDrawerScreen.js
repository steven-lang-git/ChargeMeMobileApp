import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import * as firebase from 'firebase';
import {Icon} from 'native-base'
import AwesomeAlert from 'react-native-awesome-alerts';
import HomeScreen from '../screens/HomeScreen'
import CreateAccount from '../screens/CreateAccount';
import PastTransactions from '../screens/PastTransactions';
import CurrentTransactions from '../screens/CurrentTransactions';
//import NotificationSettings from '../screens/NotificationSettings';
import BillSplitStackScreen from '../navigation/BillSplitStackScreen';
import FriendsList from '../screens/FriendsList';
//import SettingsScreen from '../screens/SettingsScreen';
import SettingsStackScreen from '../navigation/SettingsStackScreen';
import DrawerMenu from "../screens/DrawerMenu";

const{width, height} = Dimensions.get('window')

const AppDrawerNavigator = createDrawerNavigator({
    // Home:{screen: HomeScreen},
    // CreateAccount: {screen: CreateAccount},
    PastTransactions: {screen:  PastTransactions, navigationOptions: {title: 'Past Transactions'}},
    CurrentTransactions: {screen: CurrentTransactions, navigationOptions: {title: 'Current Transactions'}},
    // Settings: {screen: SettingsScreen, navigationOptions: {title: 'Settings'}},

    SettingsStackScreen: {screen: SettingsStackScreen, navigationOptions:
              {
                  title: 'Settings',
                  drawerIcon: (tintColor) =>(
                    <Icon name="sliders" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>),
              }
    },

    BillSplitStackScreen: {screen: BillSplitStackScreen, navigationOptions:
              {
                  title: 'Bill Split',
                  drawerIcon: (tintColor) =>(
                    <Icon name="money" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>),
              }
    },

    FriendsList: {screen: FriendsList, navigationOptions:{title: 'Friends List'}},
  },
  {
    initialRouteName: 'PastTransactions',
    contentComponent: DrawerMenu,
    contentOptions: {
    activeTintColor: '#35b0d2'
  }
});

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft:60,
    paddingRight: 60,
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 100,
  },
  button: {
    height: 40,
    width: 100,
    marginTop:10,
    marginBottom: 10,
    paddingTop: 10,
    marginLeft:30,
    marginRight:30,
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#35b0d2',
  },
  btntext:{
    textAlign: 'center',
    color: 'rgb(32,53,70)',
    color: 'white',
    fontSize: 15,
  }
});


export default AppDrawerNavigator;
