import React from 'react';
import * as firebase from 'firebase';
import {ActivityIndicator, AppRegistry, StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, StatusBar, TextInput, Button,Dimensions, Image, ImageBackground, TouchableOpacity, TouchableHighlight, Keyboard} from 'react-native';
import {Header,Left,Right,Icon} from 'native-base';
import {StackNavigator, createAppContainer, createStackNavigator, StackActions, NavigationActions} from 'react-navigation';
import CreateAccount from './CreateAccount';
import PastTransactions from './PastTransactions';

let emailEmpty = false;
let passwordEmpty = false;
const{width} = Dimensions.get('window')

//initializing firebase, this only needs to be done once within our app
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
    this.state = {
      email: '',
      password:'',
      error:'',
      loading: false,
      disable: true,
    };
  }

  //function to handle clicking login button
  onLoginPress(){
    //get email and password from state
    const{email,password} = this.state;

    if(email == ''){
      console.log('email empty')
      emailEmpty = true;
    }
    if(password == ''){
      console.log('password empty')
      passwordEmpty = true;
    }

    //force page to rerender to display accurate error messages
    this.forceUpdate();

    if(passwordEmpty == false && emailEmpty == false){
      this.setState({error:'', loading:true});

      //call firebase authentication method using email and password
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(() => {
        //if we are signed in without any error, navigate to PastTransactions page
        this.setState({error:'', loading:false});
        this.props.navigation.navigate('PastTransactions');
      })
      .catch(() =>{
        //if there is an error during authentication
        this.setState({error: 'Login failed', loading: false});
      })
    }
  }

  updateEmail(email){
    this.setState({disable: false})
    if(email == ''){
      emailEmpty = true
    }
    else{
      emailEmpty = false
    }
    this.setState({email: email})
  }

  updatePassword(password){
    this.setState({disable: false})
    if(password == ''){
      passwordEmpty = true
    }
    else{
      passwordEmpty = false
    }
    this.setState({password: password})
  }

  //function to decide whether to display login button or loading spin
  renderButtonOrLoading(){
    //if we are in a state of loading show loading spin
    if(this.state.loading){
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#35b0d2" />
        </View>
      )
    }
    //if not in state of loading show login button (button is bound to
    //onLoginPress function)
    const isDisabled  = this.state.disable;
    return (
      <View>
          <View style={isDisabled?styles.disabled:styles.enabled}>
            <TouchableOpacity
              style={styles.button}
              disabled = {isDisabled}
              onPress={this.onLoginPress.bind(this)}>
              <Text style={styles.btntext}>SIGN IN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <Text style={styles.title} onPress={() => this.props.navigation.navigate('CreateAccount')}> Create an Account </Text>
          </View>
      </View>
    )
  }

  render() {
    const {navigate} =this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/coin.jpg')} style={styles.imageContainer}>
              <View style={styles.overlay} />
              <StatusBar barStyle="light-content" />
              <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                <View style={styles.container}>

                  <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/logo_transparent.png')}/>
                  </View>

                  <View style={styles.infoContainer}>

                    <View style={styles.inputBoxContainer}>

                      <TextInput
                          style={[styles.input,{
                            borderColor: emailEmpty == true
                              ? 'red'
                              : '#35b0d2',
                          }]}
                          placeholder="Enter email"
                          placeholderTextColor="rgba(255,255,255,0.8)"
                          onChangeText={(email) => this.updateEmail(email)}
                          keyboardType='email-address'
                          returnKeyType='next'
                          autoCorrect={false}
                          autoCapitalize = 'none'
                          onSubmitEditing={()=> this.refs.txtPassword.focus()}
                      />

                      <TextInput
                          style={[styles.input,{
                            borderColor: passwordEmpty == true
                              ? 'red'
                              : '#35b0d2',
                          }]}
                          placeholder="Enter password"
                          placeholderTextColor="rgba(255,255,255,0.8)"
                          returnKeyType='go'
                          onChangeText={(password) => this.updatePassword(password)}
                          secureTextEntry
                          autoCorrect={false}
                          ref={"txtPassword"}
                      />
                      <Text style={styles.errorMessage}>{this.state.error}</Text>
                    </View>

                    <View style = {styles.signUpContainer}>
                      {this.renderButtonOrLoading()}
                    </View>

                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ImageBackground>
          </SafeAreaView>


    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',

  },
  errorMessage:{
    color: 'red',
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 15,
  },
  inputBoxContainer:{
    flex:1,
    justifyContent: 'center',
  },
  signUpContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header:{
    position:'absolute',
  },
  imageContainer: {
      resizeMode:'cover',
      flex:1,
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(69,85,117,0.7)',
  },
  logo: {
    flex: 1,
    width: width/1.5,
    resizeMode: 'contain',
  },
  logoContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: width,
  },
  infoContainer: {
    flex: 1,
    width: width,
    padding:20,
  },
  nameContainer:{
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height:40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color:'#fff',
    marginBottom: 20,
    paddingHorizontal:10,
    borderWidth: 2,
    borderRadius: 20,
  },
  nameInput: {
    height:40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color:'#fff',
    width: width/2.3,
    marginBottom: 5,
    paddingHorizontal:10,
    borderWidth: 2,
    borderRadius: 20,
  },
  title:{
    color: '#fff',
    fontSize: 15,
    textAlign:'center',
    opacity: 0.9
  },
  inputTitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  button: {
    width: 200,
    marginTop:10,
    marginBottom: 10,
    paddingTop:15,
    paddingBottom:15,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#35b0d2',
    backgroundColor: '#35b0d2',
  },
  btntext:{
    textAlign: 'center',
    color: 'rgb(32,53,70)',
    color: 'white',
    fontSize: 18,
  },
  disabled: {
    flex:1,
    opacity: 0.3,
  },
  enabled: {
    flex:1,
    opacity: 1,
  },
});
