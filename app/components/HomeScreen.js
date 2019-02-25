import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, StatusBar, TextInput, Button,Dimensions, Image, ImageBackground,TouchableOpacity,TouchableHighlight,Keyboard } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'
import { StackNavigator, createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
//import RegForm from './RegForm';
import CreateAccount from './CreateAccount';
import PastTransactions from './PastTransactions';

const{width} = Dimensions.get('window')

firebase.initializeApp({
    apiKey: "AIzaSyCjuVd8HrMNvgmtflV1s7XpJGMQbpzuX8w",
    authDomain: "chargeme-e6936.firebaseapp.com",
    databaseURL: "https://chargeme-e6936.firebaseio.com",
    projectId: "chargeme-e6936",
    storageBucket: "chargeme-e6936.appspot.com",
    messagingSenderId: "148195634104"
  }
);


export default class HomeScreen extends React.Component {
  // constructor with state of email, password,
  // error, and loading properties to support login
  constructor(props){
    super(props);
    this.state = {email: '', password:'', error:'', loading: false};
  }

  //function to handle clicking login button
  onLoginPress(){
    this.setState({error:'', loading:true});
    //get email and password from state
    const{email,password} = this.state;

    //call firebase authentication method using email and password
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(() => {
      //if we are signed in without any error, navigate to PastTransactions page
      this.setState({error:'', loading:false});
      this.props.navigation.navigate('PastTransactions');
    })
    .catch(() =>{
      //if there is an error during authentication
      this.setState({error: 'Authentication Failed', loading: false});
    })
  }

  //function to decide whether to display login button or loading sign
  renderButtonOrLoading(){
    //if we are in a state of loading show loading message
    if(this.state.loading){
      return <Text style={{color: 'white'}}> Loading... </Text>
    }
    //if not in state of loading show login button (button is bound to
    //onLoginPress function)
    return <View>
      <TouchableOpacity style={styles.button}
        onPress={this.onLoginPress.bind(this)}>
        <Text style={styles.btntext}>SIGN IN</Text>
      </TouchableOpacity>
    </View>
  }


   static navigationOptions ={
     drawerIcon: (tintColor) =>(
       <Icon name="home" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
     )
  }

  render() {
    const {navigate} =this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../assets/coin.jpg')} style={styles.imageContainer}>
            <View style={styles.overlay} />
            <Header style={{backgroundColor: 'transparent', borderBottomWidth:0,}}>
              <Left>
                <Icon name="bars" type="FontAwesome" onPress={()=>this.props.navigation.openDrawer()}/>
              </Left>
            </Header>
              <StatusBar barStyle="light-content" />
              <KeyboardAvoidingView style={styles.container}>
                <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                <View style={styles.logoContainer}>
                      <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={require('../../assets/logo_transparent.png')}>
                        </Image>
                      </View>
                      <View style={styles.infoContainer}>
                        <TextInput style={styles.input}
                          placeholder="Enter username/email"
                          placeholderTextColor="rgba(255,255,255,0.8)"
                          onChangeText={(email) => this.setState({email})}
                          keyboardType='email-address'
                          returnKeyType='next'
                          autoCorrect={false}
                          onSubmitEditing={()=> this.refs.txtPassword.focus()}
                        />

                        <TextInput style={styles.input}
                          placeholder="Enter password"
                          placeholderTextColor="rgba(255,255,255,0.8)"
                          returnKeyType='go'
                          onChangeText={(password) => this.setState({password})}
                          secureTextEntry
                          autoCorrect={false}
                          ref={"txtPassword"}
                        />
                        <Text style={{color: 'red'}}>{this.state.error}</Text>

                        {this.renderButtonOrLoading()}

                        <Text style={styles.title} onPress={() => this.props.navigation.navigate('CreateAccount')}> Create an Account </Text>
                      </View>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
              </ImageBackground>
            </SafeAreaView>


    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',

  },
  header:{
    position:'absolute',
  },
  imageContainer: {
      width: null,
      height: null,
      aspectRatio:1,
      resizeMode:'cover',
      justifyContent: 'center',
      flex:1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(69,85,117,0.7)',
    },
logo: {
  width: 256,
  height:112,
  bottom:170,
},
logoContainer:{
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  width: width,
  padding:20,
},
infoContainer: {
  position:'absolute',
  left:0,
  right: 0,
  bottom: 200,
  height: 200,
  padding: 20,
},
input: {
  height:40,
  backgroundColor: 'rgba(255,255,255,0.2)',
  color:'#fff',
  marginBottom:20,
  paddingHorizontal:10
},
title:{
  color: '#fff',
  fontSize: 14,
  textAlign:'center',
  marginTop: 20,
  opacity: 0.9
},
  button: {
    paddingVertical: 15,
    backgroundColor: '#34c6de',

  },
  btntext:{
    textAlign: 'center',
    color: 'rgb(32,53,70)',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  }
});
