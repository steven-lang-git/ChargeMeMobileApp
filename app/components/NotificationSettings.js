import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
export default class NotificationSettings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text> NotificationSettings</Text>

      </View>
    );
  }
}


const styles = StyleSheet.create({
container:{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
}

});
