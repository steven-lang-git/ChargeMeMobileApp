import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';
//import RegForm from './app/components/RegForm';
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


//var admin = require('firebase-admin');

//var serviceAccount = require('Macintosh HD⁩/Users/⁨angelaflores⁩/⁨Documents⁩/chargeme-e6936-firebase-adminsdk-5tpy3-09c244d956.json')

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://chargeme-e6936.firebaseio.com'

// });

const{width} = Dimensions.get('window')
export default class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        possibleFriends: [
          'Angela',
          'Steven',
          'Nikki',
          'Jasmin',
        ],
        currentFriends: [
          'John',
          'Jason',
        ],
      }
    }

  addFriend = (index) => {
    const {
      currentFriends,
      possibleFriends,
    } = this.state

    // Pull friend out of possibleFriends
    const addedFriend = possibleFriends.splice(index, 1)

    // And put friend in currentFriends
    currentFriends.push(addedFriend)

    // Finally, update our app state
    this.setState({
      currentFriends,
      possibleFriends,
    })
  }

  removeFriend = (index) => {

    const {
      currentFriends,
      possibleFriends,
    } = this.state

    // Pull friend out of currentFriends
    const removedFriend = currentFriends.splice(index, 1)

    // And put friend in currentFriends
    possibleFriends.push(removedFriend)

    // Finally, update our app state
    this.setState({
      currentFriends,
      possibleFriends,
    })
  }


  render() {
    return (

      <AppDrawerNavigator
      screenProps={ {
               currentFriends: this.state.currentFriends,
               possibleFriends: this.state.possibleFriends,
               addFriend: this.addFriend,
               removeFriend: this.removeFriend,
             } }
       />
      //<AppNavigator />

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
  Home:{screen: HomeScreen},
  CreateAccount: {screen: CreateAccount},
  //Login: {screen: RegForm},
  BillSplit: {screen: BillSplit},
  ReceiptScanner:{screen:  ReceiptScanner},
  FriendsList: {screen: FriendsList},
  SplitByItem: {screen: SplitByItem},
  SplitEvenly: {screen: SplitEvenly},
  PastTransactions: {screen:  PastTransactions},
  CurrentTransactions: {screen: CurrentTransactions},
  Search: {screen: Search},
  Settings: {screen: NotificationSettings},
}, {
  contentComponent: CustomDrawerComponent,
  drawerWidth: width,
  contentOptions: {
  activeTintColor: '#64daed'
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
