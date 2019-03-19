import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Button} from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

export default class PaymentMethods extends React.Component {
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
