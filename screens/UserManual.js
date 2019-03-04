import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

export default class UserManual extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="sitemap" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }
  render() { 
    return (
      <View style={styles.container}>
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>



        <Text> User Manual Page </Text>



      </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
container:{
  flex: 1,

}

});
