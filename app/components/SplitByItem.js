import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
export default class SplitByItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text> split by item</Text>

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
