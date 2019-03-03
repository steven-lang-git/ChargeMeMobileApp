import React from 'react';
import { Button,StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'
import { Constants } from 'expo';
import * as firebase from 'firebase';


export default class PastTransactions extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="check-circle" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      messages: []
    }

    this.addItem = this.addItem.bind(this);
  }
    componentDidMount() {
      firebase
        .database()
        .ref()
        .child("messages")
        .once("value", snapshot => {
         const data = snapshot.val()
         if(snapshot.val()) {
           const initMessages = [];
           Object 
            .keys(data)
            .forEach(message => initMessages.push(data[message]));
            this.setState({
              messages: initMessages
            })
         } 
        });

        
      firebase
        .database()
        .ref()
        .child("messages")
        .on("child_added", snapshot=> { 
          const data = snapshot.val();
          if( snapshot.val()) {
            this.setState(prevState => ({
              messages: [data, ...prevState.messages]
            }))
          }
        })
    }
    addItem(){
      if(!this.state.message) return; 
      const newMessage = firebase.database().ref()
                            .child("messages")
                            .push();
      newMessage.set(this.state.message, () => this.setState({message: ''}))
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
      <TextInput placeholder = 'enter your message' onChangeText={(text)=> this.setState({message:text})} 
      style={styles.txtInput}/>
      <Button title='Send' onPress={this.addItem}/>
      <Text> past transactions</Text>
      </View>
      <FlatList data={this.state.messages}
      renderItem={({item}) => 
      <View style={styles.listItemContainer}>
        <Text style={styles.listItem}>
          {item}
        </Text>
      </View>}
      />
      </View>
    );
  }
}


const styles = StyleSheet.create({
container:{
  flex: 1,
  backgroundColor: '#eee',
  marginTop: Constants.statusBarHeight
},
msgBox:{
  flexDirection:'row',
  padding:20,
  backgroundColor:'#fff'
},
txtInput:{
  flex: 1 
},
listItemContainer:{
  backgroundColor: '#fff', 
  margin: 5,
  borderRadius: 5,
},
listItem:{
  fontSize:20,
  padding: 10 
}

});
