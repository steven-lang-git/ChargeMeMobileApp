import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground} from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

export default class NotificationSettings extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="sitemap" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }
  render() {
    return (

      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../assets/blue.jpg')} style={styles.imageContainer}>
          <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={{flex:1}}>
          <ScrollView>

            <TouchableOpacity style={styles.fButton} onPress={() => this.props.navigation.navigate('PushNotifications')}>
              <Text>
                <Text style={styles.btntext}>PUSH NOTIFICATIONS </Text>
                <Icon name="angle-right" type="FontAwesome" style={styles.icon}/>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('TextNotifications')}>
              <Text>
                <Text style={styles.btntext}>TEXT NOTIFICATIONS </Text>
                <Icon name="angle-right" type="FontAwesome" style={styles.icon}/>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('EmailNotifications')}>
              <Text>
                <Text style={styles.btntext}>EMAIL NOTIFICATIONS </Text>
                <Icon name="angle-right" type="FontAwesome" style={styles.icon}/>
              </Text>
            </TouchableOpacity>

          </ScrollView>
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
  heading:{
    fontSize:22,
    fontWeight: 'bold',
    color: "#000",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  textinput: {
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 40,
    marginBottom: 30,
    color: "#000",
  },
  fButton: {
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },
  button: {
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
  },
  btntext:{
    fontSize: 20,
    color: 'white',
  },
  icon:{
    fontSize:28,
    color: 'white',
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
