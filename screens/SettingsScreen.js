import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

export default class SettingsScreen extends React.Component {

  // static navigationOptions ={
  //   drawerIcon: (tintColor) =>(
  //     <Icon name="sliders" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
  //   )
  // }

  render() {
    return (
      <View style={styles.container}>

        <Header>
          <Left>
            <Icon name="bars" type="FontAwesome" onPress={()=>this.props.navigation.openDrawer()}/>
          </Left>
        </Header>


        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>

          <Text> Settings Screen</Text>

          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('UserProfile')}>
            <Text style={styles.btntext}>EDIT PROFILE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('PaymentMethods')}>
            <Text style={styles.btntext}>PAYMENT METHODS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('NotificationSettings')}>
            <Text style={styles.btntext}>NOTIFICATIONS</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ChangePassword')}>
            <Text style={styles.btntext}>CHANGE PASSWORD</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('UserManual')}>
            <Text style={styles.btntext}>USER MANUAL</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('DeveloperGuide')}>
            <Text style={styles.btntext}>DEVELOPER GUIDE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('FAQs')}>
            <Text style={styles.btntext}>FAQS</Text>
          </TouchableOpacity>


        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,

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
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  btntext:{
    color: '#fff',
    fontWeight: 'bold',
  }
});
