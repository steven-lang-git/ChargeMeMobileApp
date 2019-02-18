import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

export default class CurrentTransactions extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="check-square" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }
  render() {
    return (
      <View style={styles.container}>
      <Header>
        <Left>
          <Icon name="bars" type="FontAwesome" onPress={()=>this.props.navigation.openDrawer()}/>
        </Left>
      </Header>
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>

      <Text> current transactions</Text>
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
