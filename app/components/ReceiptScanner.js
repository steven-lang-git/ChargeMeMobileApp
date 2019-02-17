import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
export default class ReceiptScanner extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text> receipt scanner screen</Text>

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
