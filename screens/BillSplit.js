import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'



export default class BillSplit extends React.Component {


  render() {
    return (
      <View style={styles.container}>
      <Header>
        <Left>
          <Icon name="bars" type="FontAwesome" onPress={()=>this.props.navigation.openDrawer()}/>
        </Left>
      </Header>
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>

      <Text> Bill split screen</Text>
      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SplitByItem')}>
        <Text style={styles.btntext}>SPLIT BY ITEM</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SplitEvenly')}>
        <Text style={styles.btntext}>SPLIT EVENLY</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ReceiptScanner')}>
        <Text style={styles.btntext}>SCAN YOUR RECEIPT</Text>
      </TouchableOpacity>



      </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
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
  }
});
