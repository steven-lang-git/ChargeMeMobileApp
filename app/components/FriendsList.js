import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
export default class FriendsList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text> friends list screen.</Text>

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
