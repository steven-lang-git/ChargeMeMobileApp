import React from 'react';
import {ActivityIndicator, AppRegistry, StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, StatusBar, TextInput, Button,Dimensions, Image, ImageBackground, TouchableOpacity, TouchableHighlight, Keyboard, DatePickerIOS, ScrollView} from 'react-native';
import {Header,Left,Right,Icon} from 'native-base';
import * as firebase from 'firebase';

const{width} = Dimensions.get('window')

export default class CreateAccount extends React.Component {
  // constructor with state of email, password,username, firstName, lastName, phoneNumber,birthday, street, city,
  // state, zipCode, error, loading properties to support account creation
  constructor(props){
    super(props);
    this.state = {username:'', firstName: '', lastName: '', email: '', phone: '', birthday: new Date() ,
      street: '', city: '', state: '', zipCode: '',password:'', error:'', loading: false};

    this.setDate = this.setDate.bind(this);

    var error = 'error message';
  }



  //function to handle changing birthday date DatePickerIOS
  setDate(newDate){
    this.setState({birthday: newDate})
  }

  //function to handle clicking sign up button
  onSignUpPress(){

    this.setState({error:''});

    //call allFieldsFilled method
    this.allFieldsFilled();

    console.log('status fields filled'+ this.state.error);

    if(this.state.error == ''){

      //call makeUsernameUnique function
      this.makeUsernameUnique()


      //get email and password from state
      const{email,password} = this.state;

      console.log('error:' + this.state.error);

      if(this.state.error == ''){

          this.setState({loading:true});
          //call firebase authentication method using email and password
          firebase.auth().createUserWithEmailAndPassword(email,password)
          .then(() => {
            //if we are signed in without any error, navigate to PastTransactions page
            //*** NEED TO ADD CODE TO SAVE USER INPUT***
            this.setState({error:'', loading:false});

            //get user id
            var userId = firebase.auth().currentUser.uid;

            //write user info
            firebase.database().ref('users/' + userId).set({
              username: this.state.username,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
              phone: this.state.phone,
              birthday: this.state.birthday,
            });


            this.props.navigation.navigate('PastTransactions');
          })
          .catch(() =>{
            //if there is an error during account creation

            this.setState({error: 'There is already an account with that email', loading: false});

            if(this.state.password.length < 6){
              this.setState({error: 'Password must be at least 6 characters', loading: false});
            }
          })
        }
      }
  }


//function to check if entered username already exists
  makeUsernameUnique(){

    //save the username entered
    var currentUsername = this.state.username;
    console.log('username: ' + currentUsername);

    //save the root reference to the database
    var ref = firebase.database().ref();

    //find all users that have the current username
    ref.child('users').orderByChild('username').equalTo(currentUsername).once('child_added')
    .then(() => {
      this.setState({error: 'That username is taken'});
      console.log('async');
      });
  }

  //function to check all fields are filled out
  allFieldsFilled(){
    if (this.state.email == '' || this.state.password == '' || this.state.username == ''|| this.state.firstName == ''|| this.state.lastName == ''|| this.state.phone == ''){
      this.setState({error: 'All fields must be filled'}, () => {
        console.log('inside if statement' + this.state.error);
      });

    }

    console.log('status within fields filled'+ this.state.error);

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

      <Text style={styles.title} onPress={() => this.props.navigation.navigate('HomeScreen')}> Already have an Account? </Text>

    </View>
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
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      autoCorrect= {false}
                      returnKeyType='next'
                      onChangeText={(username) => this.setState({username})}
                      />

                      <Text style={styles.inputTitle}>Email</Text>
                      <TextInput style={styles.input}
                      placeholder="'john123@email.com'"
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      autoCorrect= {false}
                      returnKeyType='next'
                      onChangeText={(email) => this.setState({email})}
                      />

                      <Text style={styles.inputTitle}>Password (at least 6 characters)</Text>
                      <TextInput style={styles.input}
                      placeholder="*******"
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      autoCorrect= {false}
                      secureTextEntry
                      returnKeyType='next'
                      onChangeText={(password) => this.setState({password})}
                      />

                      <Text style={styles.inputTitle}>First Name</Text>
                      <TextInput style={styles.input}
                      placeholder="'John'"
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      returnKeyType='next'
                      onChangeText={(firstName) => this.setState({firstName})}
                      />

                      <Text style={styles.inputTitle}>Last Name</Text>
                      <TextInput style={styles.input}
                      placeholder="'Doe'"
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      returnKeyType='next'
                      onChangeText={(lastName) => this.setState({lastName})}
                      />

                      <Text style={styles.inputTitle}>Phone Number</Text>
                      <TextInput style={styles.input}
                      placeholder="(###)###-####"
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      returnKeyType='next'
                      onChangeText={(phone) => this.setState({phone})}
                      />

                      <Text style={styles.inputTitle}>Birthday</Text>

                      </View>

                      <View style = {styles.datePickerContainer}>
                      <DatePickerIOS
                      date={this.state.birthday}
                      onDateChange={this.setDate}
                      mode = 'date'
                      />
                      </View>

                      <View style = {styles.signUpContainer}>
                        <Text style={styles.errorMessage}>{this.state.error}</Text>

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
    marginTop: 5,
    marginBottom: 5,
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
  marginBottom:20,
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
