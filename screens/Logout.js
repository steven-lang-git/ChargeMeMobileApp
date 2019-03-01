import React from 'react';
import * as firebase from 'firebase';
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'
import HomeScreen from './HomeScreen';


export default class BillSplit extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="arrow-circle-left" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }


  signOutUser = async () => {
    try{
      await firebase.auth().signOut();
      this.props.navigation.navigate('HomeScreen');
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Header>
        <Left>
          <Icon name="bars" type="FontAwesome" onPress={()=>this.props.navigation.openDrawer()}/>
        </Left>
      </Header>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Text> Do you wish to log out?</Text>
          <TouchableOpacity style={styles.button} onPress={this.signOutUser.bind(this)}>
            <Text style={styles.btntext}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  header:{
    fontSize:24,
    color: "#000",
    paddingBottom: 10,
    marginBottom:40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  textinput: {
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 40,
    marginBottom: 30,
    color: "#000",
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
    width: '60%',
    marginTop: 20,
    marginBottom: 40,
    alignSelf: 'center',
  },
  btntext:{
    color: '#fff',
    fontWeight: 'bold',
  }
});
