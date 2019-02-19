import React from 'react';
import { StyleSheet, Text, View, TextInput, Button,Dimensions, Image, ImageBackground,TouchableOpacity,TouchableHighlight } from 'react-native';
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

  handleClick = () => {
      alert('Button clicked!');
  }
  buttonPressed(page){
    this.props.navigator.replace({
      id: page,
    })
  }
  render() {
    const {navigate} =this.props.navigation;
    return (
      <View style={styles.container}>
            <Header style={{backgroundColor: 'transparent', borderBottomWidth:0,}}>
              <Left>
                <Icon name="bars" type="FontAwesome" onPress={()=>this.props.navigation.openDrawer()}/>
              </Left>
            </Header>
            <ImageBackground source={require('../../assets/coin.jpg')} style={styles.imageContainer}>
            <View style={styles.overlay} />

            <View style={{textAlign: 'center', fontSize:30, padding:40, position:'absolute', width: width,}}>

            <Image source={require('../../assets/logo_transparent.png')} style={{justifyContent:'center', alignItems:'center',width:width, height:200, position:'absolute', bottom: 150}}>
            </Image>


            <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Login')}>
              <Text style={styles.btntext}>Sign in</Text>
            </TouchableOpacity>

              <Text style={{color:'white', textAlign:'center', paddingTop:30,}}
              onPress={ ()=> navigate('SignUp')}>Create an Account
              </Text>
            </View>
            </ImageBackground>



        </View>


    );
  }
}


const NavigationApp= StackNavigator ({
  Login: {screen: RegForm},
  SignUp: {screen: CreateAccount},
});

const styles = StyleSheet.create({
  container:{
    flex: 1,


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


  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
    marginTop: 30,
  },
  btntext:{
    color: 'white',
    fontSize: 24,
  }
});
