import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions TouchableOpacity } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

export default class LoginPage extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="home" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }
  render() {
    return (
      <View style={styles.regform}>
      <Header style:{{backgroundColor: 'transparent', position:'absolute', borderBottomWidth:0,}}>
        <Left>
          <Icon name="bars" type="FontAwesome" onPress={()=>this.props.navigation.openDrawer()}/>
        </Left>
      </Header>
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center', paddingLeft:60, paddingRight: 60}}>
      <View style ={styles.textfields}>
        <TextInput style= {styles.input}>
          placeholder= "username"
          returnKeyType = "next"
          onSubmitEditing= {() =>this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autocorrect={false}
      </TextInput>
      <TextInput style={styles.input}>
      placeholder="password"
      returnKeyType="go"
      secureTextEntry
      ref={(input)=>this.password =input}
      </TextInput>
      <TouchableOpacity style ={styles.buttoncontainer} onPress={()=>this.props.navigation.navigate()}
</View>


      </View>
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Login: LoginPage,
  Register : RegisterPage,
  Home: HomePage
})
const styles = StyleSheet.create({
regform: {
  flex: 1,
  // backgroundColor: '#fff',
  // justifyContent: 'center',
  // paddingLeft:60,
  // paddingRight: 60,
},
header:{
  fontSize:24,
  color: 'black',
  paddingBottom: 10,
  marginBottom:40,
  borderBottomColor: 'blue',
  borderBottomWidth: 1,
},
textinput: {
  alignSelf: 'stretch',
  height: 40,
  marginBottom: 30,
  color: 'black',
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
  fontWeight: 'bold',
}

});
