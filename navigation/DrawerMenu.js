import React, { Component } from "react"
import {Image, Dimensions} from 'react-native'
import { DrawerActions, StackActions, NavigationActions} from 'react-navigation';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
import DrawerItem from '../components/DrawerItemComponent'
import AwesomeAlert from 'react-native-awesome-alerts';
import * as firebase from 'firebase';

const{width, height} = Dimensions.get('window')

const menuData = [
  {icon: "address-card", name:"Dashboard", screenName:"Dashboard", activeTint: "#35b0d2", key: 1},
  {icon: "check-circle", name:"Past Transactions", screenName:"PastTransactions", activeTint: "#35b0d2", key: 2},
  {icon: "clock-o", name:"Current Transactions", screenName:"CurrentTransactions", activeTint: "#35b0d2", key: 3},
  {icon: "sliders", name:"Settings", screenName:"SettingsStackScreen", activeTint: "#35b0d2", key: 4},
  {icon: "money", name:"Bill Split", screenName:"BillSplitStackScreen", activeTint: "#35b0d2", key: 5},
  {icon: "users", name:"Friends", screenName:"FriendsList", activeTint: "#35b0d2", key: 6},
]

let showAlert = false

class DrawerMenu extends Component {

  constructor(props){
    super(props);
    showAlert = false;
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  }

  //function to show alert
  showMyAlert =() => {
    showAlert = true;
    this.forceUpdate();
  }

  //function to log out current user
  signOutUser = async () => {
    try{
      //sign out user
      await firebase.auth().signOut();
      //navigate back to authorization navigator
      this.props.navigation.navigate('Auth');
    } catch (e) {
      console.log(e);
    }
  }

  //function to hide alert
  hideAlert = () => {
      showAlert= false;
      this.forceUpdate();

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 50, height:150,backgroundColor:'white', alignItems: 'center', justifyContent: 'center'}}>
          <Image source={require('../assets/AppIcons/Assets.xcassets/AppIcon.appiconset/1024.png')} style={{ height: 120, width: 120, borderRadius: 60 }}/>
        </View>
        <FlatList
          data={menuData}
          renderItem={({item}) => <DrawerItem navigation={this.props.navigation} screenName={item.screenName} icon={item.icon} name={item.name} key={item.key} />}
        />
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style ={styles.button}
            onPress = {() => this.showMyAlert()}
            >
              <Text style={styles.btntext}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
          <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Are you sure you want to log out?"
              titleStyle={{textAlign: 'center'}}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              overlayStyle={{width: width * 2,}}
              showCancelButton={true}
              cancelButtonStyle={{width: width/7, alignItems: 'center'}}
              showConfirmButton={true}
              confirmButtonStyle={{width: width/7, alignItems: 'center'}}
              cancelText="NO"
              cancelButtonTextStyle= {{fontWeight: 'bold'}}
              confirmText="YES"
              confirmButtonTextStyle= {{fontWeight: 'bold'}}
              confirmButtonColor='#35b0d2'
              onCancelPressed={() => {
                this.hideAlert();
              }}
              onConfirmPressed={() => {
                this.signOutUser();
              }}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(255,255,255,0.43)',
    alignItems: 'center',

  },
  alertContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  menuItem: {
    flexDirection:'row'
  },
  menuItemText: {
    fontSize:15,
    fontWeight:'300',
    margin:15,
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
  },
  button: {
    borderRadius:10,
    borderWidth: 1,
    width: 150,
    height: 50,
    borderColor: '#35b0d2',
    backgroundColor: '#35b0d2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntext:{
    textAlign: 'center',
    color: 'rgb(32,53,70)',
    color: 'white',
    fontSize: 18,
  }
})

DrawerMenu.defaultProps = {};

DrawerMenu.propTypes = {};

export default DrawerMenu;
