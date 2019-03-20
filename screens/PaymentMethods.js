import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Button, SafeAreaView, ImageBackground} from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

export default class PaymentMethods extends React.Component {
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

            <Text style={styles.text}>
              ChargeMe Balance:
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Bank')}>
              <Text>
                <Text style={styles.btntext}>ADD BANK </Text>
                <Icon name="angle-right" type="FontAwesome" style={styles.icon}/>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('DebitCard')}>
              <Text>
                <Text style={styles.btntext}>ADD DEBIT CARD </Text>
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
  text: {
    fontSize: 20,
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    color: 'white',
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
    color: '#fff',
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
