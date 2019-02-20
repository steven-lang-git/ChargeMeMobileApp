import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, StatusBar, TextInput, Button,Dimensions, Image, ImageBackground,TouchableOpacity,TouchableHighlight,Keyboard } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

export default class FriendsList extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="users" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
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
      <Text> We have { this.props.screenProps.currentFriends.length } friends!</Text>
            <Button
              title="Back to home"
              onPress={() =>
                this.props.navigation.navigate('Home')
              }
            />
      <Text> Currently our friends are:</Text>
      {
          this.props.screenProps.currentFriends.map((friend, index) => (
            <Button
              key={ friend }
              title={ `Remove ${ friend }` }
              onPress={() =>
                this.props.screenProps.removeFriend(index)
                }
            />

          )
        )
        }
      <Text>Add friends here!</Text>
      {
          this.props.screenProps.possibleFriends.map((friend, index) => (
            <Button
              key={ friend }
              title={ `Add ${ friend }` }
              onPress={() =>
                this.props.screenProps.addFriend(index)
              }
            />
          )
        )
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
