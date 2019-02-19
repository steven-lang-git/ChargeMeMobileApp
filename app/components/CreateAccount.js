import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

export default class CreateAccount extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="male" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }
  render() {
    return (
      <View style={styles.regform}>
      <Header>
        <Left>
          <Icon name="bars" type="FontAwesome" onPress={()=>this.props.navigation.openDrawer()}/>
        </Left>
      </Header>

      <View style={{flex:1, alignItems: 'center', justifyContent: 'center', paddingLeft:60, paddingRight: 60}}>

      <Text style={styles.header}>Welcome to ChargeMe.</Text>

      <Text style={styles.header}>Registration</Text>
      <TextInput style={styles.textinput} placeholder="Your name"
      underlineColorAndroid={'transparent'} />

      <TextInput style={styles.textinput} placeholder="Your email"
      underlineColorAndroid={'transparent'} />

      <TextInput style={styles.textinput} placeholder="Your email"
      underlineColorAndroid={'transparent'} />

      <TouchableOpacity style={styles.button} onPress ={() => this.props.navigation.navigate('Login')}>
        <Text style={styles.btntext}>Sign up</Text>
      </TouchableOpacity>
      </View>



      </View>
    );
  }
}


const styles = StyleSheet.create({
regform: {
  flex: 1,
  // backgroundColor: '#fff',
  // justifyContent: 'center',
  // paddingLeft:60,
  // paddingRight: 60,
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
  height: 40,
  marginBottom: 30,
  color: "#000",
},
button: {
  alignSelf: 'stretch',
  alignItems: 'center',
  padding: 20,
  backgroundColor: '#000',
  marginTop: 30,
},
btntext:{
  color: '#fff',
  fontWeight: 'bold',
}

});
