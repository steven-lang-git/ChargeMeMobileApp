import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

export default class CreateAccount extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="male" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }
  render(){

    return(

      <View style={styles.regform}>
        <Header>
          <Left>
            <Icon name="bars" type="FontAwesome" onPress={()=>this.props.navigation.openDrawer()}/>
          </Left>
        </Header>

        <View style={{flex:1, alignItems: 'center', justifyContent: 'center', paddingLeft:60, paddingRight: 60}}>
          <ScrollView>

            <Text style={styles.header}>Welcome to ChargeMe</Text>
            <Text style={styles.header}>Create New Account</Text>

            <Text> Username </Text>
            <TextInput style={styles.textinput} placeholder="Username"
            underlineColorAndroid={'transparent'} />

            <Text> First Name </Text>
            <TextInput style={styles.textinput} placeholder="First Name"
            underlineColorAndroid={'transparent'} />

            <Text> Last Name </Text>
            <TextInput style={styles.textinput} placeholder="Last Name"
            underlineColorAndroid={'transparent'} />

            <Text> Email </Text>
            <TextInput style={styles.textinput} placeholder="Email"
            underlineColorAndroid={'transparent'} />

            <Text> Phone Number </Text>
            <TextInput style={styles.textinput} placeholder="(###)###-####"
            underlineColorAndroid={'transparent'} />

            <Text> Birthday </Text>
            <TextInput style={styles.textinput} placeholder="mm/dd/yyy"
            underlineColorAndroid={'transparent'} />

            <Text> Street </Text>
            <TextInput style={styles.textinput} placeholder="Street"
            underlineColorAndroid={'transparent'} />

            <Text> City </Text>
            <TextInput style={styles.textinput} placeholder="City"
            underlineColorAndroid={'transparent'} />

            <Text> State </Text>
            <TextInput style={styles.textinput} placeholder="State"
            underlineColorAndroid={'transparent'} />

            <Text> ZipCode </Text>
            <TextInput style={styles.textinput} placeholder="ZipCode"
            underlineColorAndroid={'transparent'} />

            <Text> Password </Text>
            <TextInput style={styles.textinput} placeholder="Password"
            underlineColorAndroid={'transparent'} />

            <TouchableOpacity style={styles.button} onPress ={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.btntext}>Sign up</Text>
            </TouchableOpacity>

          </ScrollView>
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
