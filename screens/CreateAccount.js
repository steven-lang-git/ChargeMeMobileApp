import React from 'react';
import {ActivityIndicator, AppRegistry, StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, StatusBar, TextInput, Button,Dimensions, Image, ImageBackground, TouchableOpacity, TouchableHighlight, Keyboard, DatePickerIOS, ScrollView} from 'react-native';
import {Header,Left,Right,Icon} from 'native-base';
import * as firebase from 'firebase';
import moment from 'moment';
import ValidationComponent from 'react-native-form-validator';
import { TextInputMask } from 'react-native-masked-text';



const{width} = Dimensions.get('window')

export default class CreateAccount extends ValidationComponent {
  // constructor with state of email, password,username, firstName, lastName, phoneNumber,birthday, street, city,
  // state, zipCode, error, loading properties to support account creation
  constructor(props){
    super(props);
    this.state = {username:'', firstName: '', lastName: '', email: '', phone: '', birthday: new Date() ,
      street: '', city: '', state: '', zipCode: '',password:'', usernameError: '', emailError: '', loading: false};

    //set datepickIOS default day to today's date
    this.setDate = this.setDate.bind(this);
  }

  //function to handle changing birthday date DatePickerIOS
  setDate(newDate){
    this.setState({birthday: newDate})
  }


  //function to handle clicking sign up button
  onSignUpPress(){

    let unMasked = this.phoneNum.getRawValue();
    console.log("unmasked: "+ unMasked);

    //define rules for input fields and check for rule violations
    this.validate({
      username: {required: true},
      firstName: {required: true},
      lastName: {required: true},
      email: {required: true, email: true},
      phone: {required: true},
      password: {required: true, minlength: 6}
    })

    //force page to rerender to display accurate error messages
    this.forceUpdate();

    //make sure no errors exist
    if(this.isFormValid()){

      //call makeUsernameUnique function
      this.makeUsernameUnique()

    }
  }

  //function to create user
  createUser(){

      //get email and password from state
      const{email,password} = this.state;

      //display loading spinner
      this.setState({loading:true});

      //call firebase authentication method using email and password
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(() => {
            //if we are signed in without any error

            //display sign up button
            this.setState({ loading:false});

            //get user id
            var userId = firebase.auth().currentUser.uid;

            //format birthday
            const day = moment(this.state.birthday).format("MMM Do YY");

            //format phoneNum
            let unMask = this.phoneNum.getRawValue();



            //write user info
            firebase.database().ref('users/' + userId).set({
              username: this.state.username,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
              phone: unMask,
              birthday: day,
            });
            //allow access to app
            this.props.navigation.navigate('PastTransactions');
      })
      .catch(() =>{
            //if there is an error during account creation

            //display sign up button
            this.setState({ loading:false});

            //display email error
            this.setState({emailError: "That email is taken"});
      })
  }

  //function to check if entered username already exists
  makeUsernameUnique(){

    //save the username entered
    var currentUsername = this.state.username;

    //save the root reference to the database
    var ref = firebase.database().ref();

    //find all users that have the current username
    ref.child('users').orderByChild('username').equalTo(currentUsername).once('value', snapshot => {
      let result = snapshot.val();

      //if the username does not exist in the database
      if(!result){
        //clear username error
        this.setState({usernameError: ""});
        //call create user function
        this.createUser();
      }
      //if username is already taken
      else{
        //set username error message
        this.setState({usernameError: "username is taken"});
      }
    });
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
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress ={this.onSignUpPress.bind(this)}>
          <Text style={styles.btntext}>SIGN UP</Text>
        </TouchableOpacity>
        <Text style={styles.title} onPress={() => this.props.navigation.navigate('HomeScreen')}> Already have an Account? </Text>
      </View>
    )
  }

  render(){

    return(

      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../assets/coin.jpg')} style={styles.imageContainer}>
          <View style={styles.overlay} />

          <StatusBar barStyle="light-content" />

          <KeyboardAvoidingView style={styles.container}>
            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
              <View style={styles.logoContainer}>
                <View style={styles.logoContainer}>
                  <Image style={styles.logo} source={require('../assets/logo_transparent.png')}>
                  </Image>
                </View>

                <View style={styles.infoContainer}>

                  <ScrollView contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between'
                  }}>

                    <View style = {styles.inputBoxContainer}>

                      <Text style={styles.inputTitle}>Username</Text>
                      <TextInput style={styles.input}
                      placeholder="'john123'"
                      ref = "username"
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      autoCorrect= {false}
                      returnKeyType='next'
                      onChangeText={(username) => this.setState({username})}
                      onSubmitEditing={()=> this.refs.email.focus()}
                      />
                      {this.isFieldInError('username') && this.getErrorsInField('username').map(errorMessage => <Text style = {styles.errorMessage}>{errorMessage}</Text>) }
                      <Text style = {styles.errorMessage}>{this.state.usernameError}</Text>

                      <Text style={styles.inputTitle}>Email</Text>
                      <TextInput style={styles.input}
                      placeholder="'john123@email.com'"
                      ref = "email"
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      autoCorrect= {false}
                      returnKeyType='next'
                      onChangeText={(email) => this.setState({email})}
                      onSubmitEditing={()=> this.refs.password.focus()}
                      />
                      {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text style = {styles.errorMessage}>{errorMessage}</Text>) }
                      <Text style = {styles.errorMessage}>{this.state.emailError}</Text>

                      <Text style={styles.inputTitle}>Password</Text>
                      <TextInput style={styles.input}
                      placeholder="*******"
                      ref = "password"
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      autoCorrect= {false}
                      secureTextEntry
                      returnKeyType='next'
                      onChangeText={(password) => this.setState({password})}
                      onSubmitEditing={()=> this.refs.firstName.focus()}
                      />
                      {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text style = {styles.errorMessage}>{errorMessage}</Text>) }

                      <Text style={styles.inputTitle}>First Name</Text>
                      <TextInput style={styles.input}
                      placeholder="'John'"
                      ref = "firstName"
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      returnKeyType='next'
                      onChangeText={(firstName) => this.setState({firstName})}
                      onSubmitEditing={()=> this.refs.lastName.focus()}
                      />
                      {this.isFieldInError('firstName') && this.getErrorsInField('firstName').map(errorMessage => <Text style = {styles.errorMessage}>{errorMessage}</Text>) }

                      <Text style={styles.inputTitle}>Last Name</Text>
                      <TextInput style={styles.input}
                      placeholder="'Doe'"
                      ref = "lastName"
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      returnKeyType='next'
                      onChangeText={(lastName) => this.setState({lastName})}
                      />
                      {this.isFieldInError('lastName') && this.getErrorsInField('lastName').map(errorMessage => <Text style = {styles.errorMessage}>{errorMessage}</Text>) }

                      <Text style={styles.inputTitle}>Phone Number</Text>
                      <TextInputMask
                      type={'custom'}
                      options={
                        {
                          mask: '+1(999)999-9999',
                          getRawValue: function(value,settings){
                            return value.replace(/\D/g,'');
                          }
                        }
                      }
                      ref = {(phone) => this.phoneNum = phone}
                      value={this.state.phone}
                      onChangeText= {(phone) => this.setState({phone})}
                      style={styles.input}
                      placeholder="+1(###)###-####"
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      keyboardType={'numeric'}
                      returnKeyType='next'
                      />

                      {this.isFieldInError('phone') && this.getErrorsInField('phone').map(errorMessage => <Text style = {styles.errorMessage}>{errorMessage}</Text>) }

                      <Text style={styles.inputTitle}>Birthday</Text>

                    </View>

                    <View style = {styles.datePickerContainer}>
                      <DatePickerIOS
                      date={this.state.birthday}
                      onDateChange={this.setDate}
                      mode = 'date'
                      ref = "datePicker"
                      />
                    </View>

                    <View style = {styles.signUpContainer}>
                        {this.renderButtonOrLoading()}
                    </View>
                  </ScrollView>
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
  errorMessage:{
    color: 'red',
  },
  inputBoxContainer:{
    flex:8,
  },
  signUpContainer: {
    flex:1,
  },
  datePickerContainer: {
    flex:1,
    backgroundColor: 'rgba(255,255,255,0.2)',
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
  resizeMode: 'contain',
  // width: 256,
  // height:112,
  // bottom:300,
},
logoContainer:{
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  width: width,
  //padding:20,
},
infoContainer: {
  flex: 4,
  width: width,
  padding:20,
},
input: {
  height:40,
  backgroundColor: 'rgba(255,255,255,0.2)',
  color:'#fff',
  paddingHorizontal:10
},
title:{
  color: '#fff',
  fontSize: 15,
  textAlign:'center',
  marginTop: 20,
  opacity: 0.9
},
inputTitle: {
  color: '#34c6de',
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 5,
  marginTop: 10,
},
button: {
  paddingVertical: 15,
  marginTop: 15,
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
