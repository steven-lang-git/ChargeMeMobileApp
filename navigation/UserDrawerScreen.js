import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import {Icon} from 'native-base'
import HomeScreen from '../screens/HomeScreen'
import CreateAccount from '../screens/CreateAccount';
import PastTransactions from '../screens/PastTransactions';
import CurrentTransactions from '../screens/CurrentTransactions';
//import NotificationSettings from '../screens/NotificationSettings';
import Logout from '../screens/Logout';
import BillSplitStackScreen from '../navigation/BillSplitStackScreen';
import FriendsList from '../screens/FriendsList';
//import SettingsScreen from '../screens/SettingsScreen';
import SettingsStackScreen from '..navigation/SettingsStackScreen';



const{width} = Dimensions.get('window')

const CustomDrawerComponent= (props) => (
  <SafeAreaView style={{flex:1}}>
    <View style={{height:150,backgroundColor:'white', alignItems: 'center', justifyContent: 'center'}}>
      <Image source={require('../assets/AppIcons/Assets.xcassets/AppIcon.appiconset/1024.png')} style={{ height: 120, width: 120, borderRadius: 60 }}/>
    </View>
    <ScrollView>
    <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)

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
    Logout: {screen: Logout, navigationOptions: {title: 'Log Out'}},
  },
  {
    initialRouteName: 'PastTransactions',
    contentComponent: CustomDrawerComponent,
    //drawerWidth: width,
    contentOptions: {
    activeTintColor: '#64daed'
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
});


export default AppDrawerNavigator;
