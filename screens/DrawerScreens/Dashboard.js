import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {
  Header,
  Left,
  Icon
} from 'native-base'
import { Constants } from 'expo';
import * as firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar } from 'react-native-elements';

export default class Dashboard extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="check-circle" type="FontAwesome" style={{fontSize:24, color:tintColor}}/>
    )
  }
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      messages: [],
      firstName:'',
      lastName:'',
      username:''
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

      var uid  = firebase.auth().currentUser.uid;
      firebase.database().ref('users/'+uid).once("value", snapshot => {
        const fName = snapshot.val().firstName;
        const lName = snapshot.val().lastName;
        const user = snapshot.val().username;
        this.setState({
          firstName: fName,
          initials: fName.charAt(0) + lName.charAt(0),
          username: user
        })

      });
    }
    addItem(){
      if(!this.state.message) return;
      const newMessage = firebase.database().ref()
                            .child("messages")
                            .push();
      newMessage.set(this.state.message, () => this.setState({message: ''}))
    }

  render() {
    const { names,message } = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='always' extraScrollHeight={130}>
          <Header>
            <Left>
              <Icon name="bars" type="FontAwesome" onPress={()=>this.props.navigation.openDrawer()}/>
            </Left>
          </Header>

          <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>

            <Avatar
              size = "xlarge"
              rounded title = {this.state.initials}
            />

            <Text style={styles.text}>Welcome {this.state.firstName}</Text>
            <Text style={styles.text}>{this.state.username}</Text>




            <Text style={styles.text}>Your Recent Activity:</Text>
          </View>
          
          <FlatList data={this.state.messages}
            renderItem={({item}) =>
            <View style={styles.listItemContainer}>
              <Text style={styles.listItem}>
                {item}
              </Text>
            </View>}
          />
        </KeyboardAwareScrollView>
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
listItemContainer:{
  backgroundColor: '#fff',
  margin: 5,
  borderRadius: 5,
},
listItem:{
  fontSize:20,
  padding: 10,
},
text:{
  fontSize: 25,
},
});
