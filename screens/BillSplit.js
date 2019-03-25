import React from 'react';
import {ActivityIndicator, AppRegistry, StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, StatusBar, TextInput, Button,Dimensions, Image, ImageBackground, TouchableOpacity, TouchableHighlight, Keyboard} from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

const{width} = Dimensions.get('window')

export default class BillSplit extends React.Component {


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../assets/blue.jpg')} style={styles.imageContainer}>
        <View style={styles.overlay} />
        <Header>
          <Left>
            <Icon name="bars" type="FontAwesome" onPress={()=>this.props.navigation.openDrawer()}/>
          </Left>
        </Header>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Select Bill Split type</Text>
          </View>

          <View style={styles.infoContainer}>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SplitEvenly')}>
              <Text style={styles.btntext}>SPLIT EVENLY</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SplitByItem')}>
              <Text style={styles.btntext}>SPLIT BY ITEM</Text>
            </TouchableOpacity>

          </View>
        </ImageBackground>
      </SafeAreaView>



    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',

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
},
titleContainer:{
  justifyContent: 'center',
  alignContent: 'center',
  padding: 20,
  flex: 1,
  width: width,
},
infoContainer: {
  flex: 2,
  width: width,
  padding:20,
  // justifyContent: 'flex-start',
  // alignContent: 'flex-start',
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
  fontSize: 25,
  textAlign:'center',
},
inputTitle: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 5,
  marginTop: 10,
},

button: {
  marginTop:10,
  marginBottom: 10,
  paddingTop:15,
  paddingBottom:15,
  marginLeft:30,
  marginRight:30,
  borderRadius:10,
  borderWidth: 1,
  borderColor: '#35b0d2',
  backgroundColor: '#35b0d2',

},
btntext:{
  textAlign: 'center',
  color: 'rgb(32,53,70)',
  //fontWeight: 'bold',
  color: 'white',
  fontSize: 18,
}
});
