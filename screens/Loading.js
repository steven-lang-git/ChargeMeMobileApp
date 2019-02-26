import React from 'react'
import {ActivityIndicator, AppRegistry, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, StatusBar, Image, ImageBackground,TouchableOpacity,TouchableHighlight,KeyboardImageBackground, SafeAreaView, Keyboard, Dimensions} from 'react-native';
import HomeScreen from './HomeScreen';
import PastTransactions from './PastTransactions';
import * as firebase from 'firebase';

const{width} = Dimensions.get('window')

export default class Loading extends React.Component{

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'PastTransactions' : 'HomeScreen')
    })
  }


  render(){
    return(

      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../assets/coin.jpg')} style={styles.imageContainer}>
          <View style={styles.overlay} />

            <KeyboardAvoidingView style={styles.container}>
              <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                <View style={styles.logoContainer}>
                      <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={require('../assets/logo_transparent.png')}>
                        </Image>
                        <Text style={{color: 'white'}}>Loading</Text>
                        <ActivityIndicator size="large" color="#34c6de"/>
                      </View>

                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </ImageBackground>
        </SafeAreaView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
      width: null,
      height: null,
      aspectRatio:1,
      resizeMode:'cover',
      justifyContent: 'center',
      flex:1,
      alignItems: 'center',
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(69,85,117,0.7)',
      alignItems: 'center',
      justifyContent: 'center',
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
});
