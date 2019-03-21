import React from 'react';
import {ActivityIndicator, AppRegistry, StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, StatusBar, TextInput, Button,Dimensions, Image, ImageBackground, TouchableOpacity, TouchableHighlight, Keyboard} from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as firebase from 'firebase';

const{width} = Dimensions.get('window')
let confirmMessage = '';
let newMessage = '';
let currentMessage = '';

export default class ChangePassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {currentPassword: '', newPassword: '', confirmPassword: '', disable : true};
  }

  //on every keystroke in the newPassword, call this function
  checkNewPassword(text){
    this.setState({disable: false});
    //if new password matches current password
    if(text == this.state.currentPassword){
      //set error message for new password
      newMessage = "Must be a new password";
    }
    //if new password does not match current password
    if(text != this.state.currentPassword){
      //clear error message for new password
      newMessage = '';
    }
    //if new password is too short
    if(text.length < 6){
      //set error message for new password
      newMessage = 'New password must be at least 6 characters long';
    }

    //reflect changes in confirm password
    if(this.state.confirmPassword != '' && this.state.confirmPassword != text){
      confirmMessage = 'Must match new password';
    }
    if(this.state.confirmPassword == text){
      confirmMessage = '';
    }
    //upadte new password state
    this.setState({newPassword: text });
  }

  //on every keystroke in the confirm new password field, call this function
  checkConfirmPassword(text){
    this.setState({disable: false});
    //if confirm password does not match new password
    if(text != this.state.newPassword){
      //set error message for confirm password
      confirmMessage = "Must match new password";
    }
    //if confirm password matches new password
    if(text == this.state.newPassword){
      //clear error message for confirm password
      confirmMessage = '';
    }
    //update confirm password state
    this.setState({confirmPassword: text });
  }

  //on every keystroke in the current password field, call this function
  checkCurrentPassword(text){
    this.setState({disable: false});
    //if current password field is not empty
    if(text != ''){
      //clear error message for current password
      currentMessage = '';
    }
    //reflect changes in new password
    if(this.state.newPassword != '' && this.state.newPassword == text){
      newMessage = 'Must be a new password';
    }
    if(this.state.newPassword != '' && this.state.newPassword != text && this.state.newPassword.length < 6){
      newMessage = 'New password must be at least 6 characters long';
    }
    if(this.state.newPassword != text && this.state.newPassword.length >= 6){
      newMessage = '';
    }
    //update current password state
    this.setState({currentPassword: text});
  }

  //when user presses button to update password, call this function
  onChangePasswordPress(){
    //check that current password field has been filled
    if(this.state.currentPassword == ''){
      currentMessage = 'Please enter your current password';
    }
    //check that new password field has been filled
    if(this.state.newPassword == ''){
      newMessage = 'Please enter your new password';
    }
    //check that confirm password field has been filled
    if(this.state.confirmPassword == ''){
      confirmMessage = 'Please retype your new password';
    }

    //force re-render
    this.forceUpdate();

    //make sure there are no errors before continuing
    if( currentMessage == '' && newMessage == '' && confirmMessage == '' ){

      //get the current user
      var user = firebase.auth().currentUser;

      //get the user's email
      email = user.email;
      //console.log('email: ' + email);

      //get credentials token for the current user
      const credentials = firebase.auth.EmailAuthProvider.credential(
        email,
        this.state.currentPassword
      );

      //reauthenticate user
      user.reauthenticateAndRetrieveDataWithCredential(credentials)
      .then(() => {
          //if user successfully reauthenticated, update password
          user.updatePassword(this.state.newPassword)
          .then(() => {
              //if password successfully updated
              //send back to loading page
              this.props.navigation.navigate('HomeScreen');
          })
          .catch((error) => {console.log(error); });
      })
      .catch(() => {
        //if reauthentication fails, it must be because they entered the wrong password
        currentMessage = "Incorrect password";
        //force re-render
        this.forceUpdate();
      })
    }

  }


  render() {
    const isDisabled  = this.state.disable;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../assets/blue.jpg')} style={styles.imageContainer}>

        <KeyboardAwareScrollView contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between'
        }}>

        <View style={styles.overlay} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Choose a new secure password</Text>
            <Text> </Text>
            <Text style={styles.title}>Changing your password will log you out of the app. You will need to log back in with your new password.</Text>
          </View>
          <View style={styles.infoContainer}>

            <Text style={styles.inputTitle}>Current Password</Text>
            <TextInput style={styles.input}
              placeholder="********"
              placeholderTextColor="rgba(255,255,255,0.8)"
              onChangeText={(currentPassword) => this.checkCurrentPassword(currentPassword)}
              returnKeyType='next'
              ref = 'current'
              autoCorrect={false}
              secureTextEntry
              onSubmitEditing={()=> this.refs.new.focus()}
            />
            <Text style = {styles.errorMessage}>{currentMessage}</Text>

            <Text style={styles.inputTitle}>New Password</Text>
            <TextInput style={styles.input}
              placeholder="********"
              placeholderTextColor="rgba(255,255,255,0.8)"
              onChangeText={(text) => this.checkNewPassword(text)}
              returnKeyType='next'
              ref = 'new'
              autoCorrect={false}
              secureTextEntry
              onSubmitEditing={()=> this.refs.confirm.focus()}
            />
            <Text style = {styles.errorMessage}>{newMessage}</Text>

            <Text style={styles.inputTitle}>Confirm New Password</Text>
            <TextInput style={styles.input}
              placeholder="********"
              placeholderTextColor="rgba(255,255,255,0.8)"
              onChangeText={(text) =>this.checkConfirmPassword(text)}
              returnKeyType='go'
              ref = 'confirm'
              autoCorrect={false}
              secureTextEntry
            />
            <Text style = {styles.errorMessage}>{confirmMessage}</Text>

            <View style={isDisabled?styles.disabled:styles.enabled}>
              <TouchableOpacity style={styles.button}
                onPress={this.onChangePasswordPress.bind(this)}
                disabled = {isDisabled}>
                <Text style={styles.btntext}>Update</Text>
              </TouchableOpacity>
            </View>

            </View>

            </KeyboardAwareScrollView>
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
  disabled: {
    flex:1,
    opacity: 0.3,
  },
  enabled: {
    flex:1,
    opacity: 1,
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
  },
  titleContainer:{
    justifyContent: 'center',
    padding: 20,
    flex: 1,
    width: width,
  },
  infoContainer: {
    flex: 3,
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
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    textAlign:'left',
  },
  inputTitle: {
    color: 'white',
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
