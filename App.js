import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {createDrawerNavigator} from 'react-navigation';
import RegForm from './app/components/RegForm';
import SettingsScreen from './app/components/SettingsScreen';

export default class App extends React.Component {
  render() {
    return (

      <AppDrawerNavigator />
      // <View style={styles.container}>
      //   <Text style={styles.header}>Welcome to ChargeMe.</Text>
      //   <RegForm/>
      // </View>
    );
  }
}

const AppDrawerNavigator = createDrawerNavigator({
  Home:RegForm,
  Settings:SettingsScreen
})

const styles = StyleSheet.create({
  header:{
    fontSize:24,
    color: "#000",
    paddingBottom: 10,
    marginBottom:40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft:60,
    paddingRight: 60,
  },
});
