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

        <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7c889e'}}>
          <ScrollView>

            <Text style={styles.header, {paddingTop: 40, fontSize: 40, textAlign: 'center'}}>
            Welcome to ChargeMe</Text>

            <Text style={styles.header, {paddingTop: 20, paddingBottom: 40, fontSize: 25, textAlign: 'center'}}>
            Create New Account</Text>


            <Text style={{paddingLeft: 75}}> Username </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10}}
            placeholder="Username"
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> First Name </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="First Name"
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> Last Name </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="Last Name"
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> Email </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10}}
            placeholder="Email"
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> Phone Number </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="(###)###-####"
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> Birthday </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="mm/dd/yyy"
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> Street </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="Street"
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> City </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="City"
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> State </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="State"
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> ZipCode </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="ZipCode"
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> Password </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="Password"
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

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
