import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import {Icon} from 'native-base'

export default class TextNotifications extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="sitemap" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../../assets/blue.jpg')} style={styles.imageContainer}>
        <View style={styles.overlay} />
          <View style={styles.container}>
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>



              <Text> Text Notifications Page </Text>



            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,

  },
  header:{
    fontSize:24,
    color: "#000",
    paddingBottom: 10,
    marginBottom:40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  textinput: {
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 40,
    marginBottom: 30,
    color: "#000",
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
    width: '60%',
    marginTop: 20,
    marginBottom: 40,
    alignSelf: 'center',
  },
  btntext:{
    color: '#fff',
    fontWeight: 'bold',
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(69,85,117,0.7)',
  },
  imageContainer: {
      resizeMode:'cover',
      flex:1,
  }
});
