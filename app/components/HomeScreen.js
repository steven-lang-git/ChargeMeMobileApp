import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, StatusBar, TextInput, Button,Dimensions, Image, ImageBackground,TouchableOpacity,TouchableHighlight,Keyboard } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'
import { StackNavigator, createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import RegForm from './RegForm';
import CreateAccount from './CreateAccount';

const{width} = Dimensions.get('window')
export default class HomeScreen extends React.Component {
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
                          keyboardType='email-address'
                          returnKeyType='next'
                          autoCorrect={false}
                          onSubmitEditing={()=> this.refs.txtPassword.focus()}
                        />

                        <TextInput style={styles.input}
                          placeholder="Enter password"
                          placeholderTextColor="rgba(255,255,255,0.8)"
                          returnKeyType='go'
                          secureTextEntry
                          autoCorrect={false}
                          ref={"txtPassword"}
                        />

                        <TouchableOpacity style={styles.button}
                        onPress={()=>this.props.navigation.navigate('Login')}>
                        <Text style={styles.btntext}>SIGN IN</Text>
                        </TouchableOpacity>

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
