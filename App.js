import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import RegForm from './app/components/RegForm';
import HomeScreen from './app/components/HomeScreen'
import CreateAccount from './app/components/CreateAccount';
import BillSplit from './app/components/BillSplit';
import ReceiptScanner from './app/components/ReceiptScanner';
import FriendsList from './app/components/FriendsList';
import SplitByItem from './app/components/SplitByItem';
import SplitEvenly from './app/components/SplitEvenly';
import PastTransactions from './app/components/PastTransactions';
import CurrentTransactions from './app/components/CurrentTransactions';
import Search from './app/components/Search';
import NotificationSettings from './app/components/NotificationSettings';


const{width} = Dimensions.get('window')
export default class App extends React.Component {
  render() {
    return (

      <AppDrawerNavigator />
      // <View style={styles.container}>
      //   <Text style={styles.header}>Welcome to ChargeMe.</Text>
      //   <RegForm/>
      // </View>
    );
  }
}

const CustomDrawerComponent= (props) => (
  <SafeAreaView style={{flex:1}}>
    <View style={{height:150,backgroundColor:'white', alignItems: 'center', justifyContent: 'center'}}>
      <Image source={require('./assets/AppIcons/Assets.xcassets/AppIcon.appiconset/1024.png')} style={{ height: 120, width: 120, borderRadius: 60 }}/>
    </View>
    <ScrollView>
    <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Home:HomeScreen,
  CreateAccount: CreateAccount,
  BillSplit: BillSplit,
  ReceiptScanner: ReceiptScanner,
  FriendsList: FriendsList,
  SplitByItem: SplitByItem,
  SplitEvenly: SplitEvenly,
  PastTransactions: PastTransactions,
  CurrentTransactions: CurrentTransactions,
  Search: Search,
  Settings:NotificationSettings
}, {
  contentComponent: CustomDrawerComponent,
  drawerWidth: width,
  contentOptions: {
  activeTintColor: 'green'
  }
})


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft:60,
    paddingRight: 60,
  },
});
