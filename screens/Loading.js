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
                <View style={styles.container}>
                      <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={require('../assets/logo_transparent.png')}/>
                      </View>

                      <View style={styles.infoContainer}>
                        <Text style={styles.pageTitle}>Loading</Text>
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
  },
  imageContainer: {
    resizeMode:'cover',
    flex:1,
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(69,85,117,0.7)',
      alignItems: 'center',
      justifyContent: 'center',
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
    margin: 20,

  },
  infoContainer: {
    flex: 1,
    width: width,
    padding:20,
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
  pageTitle: {
    color: '#fff',
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
});
