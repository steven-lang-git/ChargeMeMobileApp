import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

export default class NotificationSettings extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="sitemap" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }
  render() {
    return (
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
    backgroundColor: '#fff',
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 20,
  },
  button: {
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: '#fff',
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  btntext:{
    fontSize: 20,
    color: 'black',
  },
  icon:{
    fontSize:28,
  },
});
