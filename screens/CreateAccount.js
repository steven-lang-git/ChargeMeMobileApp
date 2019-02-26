import React from 'react';
import {ActivityIndicator, AppRegistry,StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base';
import * as firebase from 'firebase';

// //initializing firebase
// firebase.initializeApp({
//     apiKey: "AIzaSyCjuVd8HrMNvgmtflV1s7XpJGMQbpzuX8w",
//     authDomain: "chargeme-e6936.firebaseapp.com",
//     databaseURL: "https://chargeme-e6936.firebaseio.com",
//     projectId: "chargeme-e6936",
//     storageBucket: "chargeme-e6936.appspot.com",
//     messagingSenderId: "148195634104"
//   }
// );

export default class CreateAccount extends React.Component {
  // constructor with state of email, password,username, firstName, lastName, phoneNumber,birthday, street, city,
  // state, zipCode, error, loading properties to support account creation
  constructor(props){
    super(props);
    this.state = {username:'', firstName: '', lastName: '', email: '', phone: '', birthday: '',
      street: '', city: '', state: '', zipCode: '',password:'', error:'', loading: false};
  }

  //function to handle clicking sign up button
  onSignUpPress(){
    this.setState({error:'', loading:true});
    //get email and password from state
    const{email,password} = this.state;

    //call firebase authentication method using email and password
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(() => {
      //if we are signed in without any error, navigate to PastTransactions page
      //*** NEED TO ADD CODE TO SAVE USER INPUT***
      this.setState({error:'', loading:false});
      this.props.navigation.navigate('PastTransactions');
    })
    .catch(() =>{
      //if there is an error during authentication
      this.setState({error: 'There is already an account with that email', loading: false});
    })
  }

  //function to decide whether to display login button or loading spin
  renderButtonOrLoading(){
    //if we are in a state of loading show loading spin
    if(this.state.loading){
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#34c6de" />
        </View>
      )
    }
    //if not in state of loading show sign up button (button is bound to
    //onSignUpPress function)
    return <View>

      <TouchableOpacity style={styles.button} onPress ={this.onSignUpPress.bind(this)}>
        <Text style={styles.btntext}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  }

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
            placeholder="'john123'"
            onChangeText={(username) => this.setState({username})}
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> First Name </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="John"
            onChangeText={(firstName) => this.setState({firstName})}
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> Last Name </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="Doe"
            onChangeText={(lastName) => this.setState({lastName})}
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> Email </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10}}
            placeholder="john123@email.com"
            onChangeText={(email) => this.setState({email})}
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> Phone Number </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="(###)###-####"
            onChangeText={(phone) => this.setState({phone})}
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> Birthday </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="mm/dd/yyy"
            onChangeText={(birthday) => this.setState({birthday})}
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> Street </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="'123 east lane'"
            onChangeText={(street) => this.setState({street})}
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> City </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="Johnville"
            onChangeText={(city) => this.setState({city})}
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> State </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="ex. CA"
            onChangeText={(state) => this.setState({state})}
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> ZipCode </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="#####"
            onChangeText={(zipCode) => this.setState({zipCode})}
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{paddingLeft: 75}}> Password </Text>
            <TextInput style={{ height: 30, width: "60%", borderColor: 'black', borderWidth: 1,  marginBottom: 10 }}
            placeholder="******"
            onChangeText={(password) => this.setState({password})}
            underlineColorAndroid={'transparent'}
            backgroundColor = 'ghostwhite'
            alignSelf = 'center'/>

            <Text style={{color: 'red'}}>{this.state.error}</Text>

            {this.renderButtonOrLoading()}

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
