import React from 'react';
import { ActivityIndicator, AppRegistry, StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, StatusBar, TextInput, Button, Dimensions, Image, ImageBackground, TouchableOpacity, TouchableHighlight, Keyboard } from 'react-native';
import { Header, Left, Right, Icon, ListItem, List } from 'native-base'
const { width } = Dimensions.get('window')
import * as firebase from 'firebase';


export default class FriendsList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      possibleFriends: [
      ],
      currentFriends: [
      ],
      firstName: ' ',
      first: '',
    }

  }

  save(){
    firebase.database().ref('friendslist/possibleFriends').set(this.state.possibleFriends);
    firebase.database().ref('friendslist/currentFriends').set(this.state.currentFriends);
    console.log('data saved');
  }


  addFriend = (index) => {
    const {
      currentFriends,
      possibleFriends,
    } = this.state

    // Pull friend out of possibleFriends
    const addedFriend = possibleFriends.splice(index, 1)

    // And put friend in currentFriends
    currentFriends.push(addedFriend)

    // Finally, update our app state
    this.setState({
      currentFriends: currentFriends,
      possibleFriends: possibleFriends,
    })
  }

  removeFriend = (index) => {

    const {
      currentFriends,
      possibleFriends,
    } = this.state

    // Pull friend out of currentFriends
    const removedFriend = currentFriends.splice(index, 1)

    // And put friend in possibleFriends
    possibleFriends.push(removedFriend)

    // Finally, update our app state
    this.setState({
      currentFriends: currentFriends,
      possibleFriends: possibleFriends,
    })
  }
  static navigationOptions = {
    drawerIcon: (tintColor) => (
      <Icon name="users" type="FontAwesome" style={{ fontSize: 24, color: tintColor }} />
    )
  }
  componentDidMount() {
    
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + uid).once("value", snapshot => {
      const nameUser = snapshot.val().firstName;
      this.setState({
        first: nameUser
      })

    });

    firebase.database().ref().child('users').once('value').then((snapshot) => {
      const {
        possibleFriends
      } = this.state

      const {
        first
      } = this.state
      snapshot.forEach((childSnapShot) => {

        possibleFriends.push(
          // value: childSnapShot.val(),
            name = childSnapShot.val().firstName
          // testing: childSnapShot.key.child(firstName)
        )
        console.log("exists", possibleFriends);
      });
      possibleFriends.splice(possibleFriends.indexOf(first), 1);
      this.setState({
        possibleFriends: possibleFriends,
      })

      // snapshot.child('fords').ref.push(possibleFriends);
      // if( firebase.database().ref('users/' + uid+'/friendList')==null){
      // firebase.database().ref('users/' + uid+'/friendList').push(possibleFriends);
      // console.log(uid);
      // }
    });
    // firebase.database().ref('users/' + uid).once("value", snapshot => {
    //   const nameUser = snapshot.val().firstName;
    //   const {
    //     possibleFriends
    //   } = this.state
    //   console.log(snapshot.val());
    //   snapshot.child('friendList').ref.push(possibleFriends);
    //   this.setState({
    //     first: nameUser
    //   })

    // });
 
    firebase.database().ref().child("friendslist").once("value",snapshot=>{
        
        const{
          possibleFriends,
          currentFriends
        } = this.state
        if(snapshot.child(uid).exists()){
          this.setState({
              possibleFriends: possibleFriends,
              currentFriends: currentFriends
            })
      
        }
        else{
        snapshot.child(uid).ref.push(
          possibleFriends);
        snapshot.child(uid).ref.push(
          currentFriends);

       
         
      }
     
      });

      // var ref = firebase.database().ref("friendslist")
      // var query = ref.orderByChild();
    }
  render() {
    return (

      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../assets/friends.jpeg')} style={styles.imageContainer}>
          <View style={styles.overlay} />
          <Header style={{ backgroundColor: 'transparent', borderBottomWidth: 0, }}>
            <Left>
              <Icon name="bars" type="FontAwesome" onPress={() => this.props.navigation.openDrawer()} />
            </Left>
          </Header>
          <StatusBar barStyle="light-content" />
          <Text> We have {this.state.currentFriends.length} friends!</Text>

          <Button color="white"
            title="Back to home"
            onPress={() =>
              this.props.navigation.navigate('PastTransactions')
            }
          />

          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <TextInput style={styles.input}
                placeholder="Search for friends"
                placeholderTextColor="rgba(255,255,255,0.8)"
                returnKeyType='go'
                autoCorrect={false}

              />
            </View>
            <Text> Currently our friends are:</Text>
            {
              this.state.currentFriends.map((friend, index) => (
                <ListItem style={styles.listContainer} >
                  <Left>
                    <Text style={styles.btntext}
                      key={friend}
                    > {`${friend}`} </Text>
                  </Left>
                  <Right>
                    <View style={styles.removeBtn}>
                      <TouchableOpacity style={styles.btntext}
                        onPress={() =>
                          this.removeFriend(index)
                        } key={friend}
                      >
                        <Text style={styles.btntext}>{`Remove ${friend}`}</Text>
                      </TouchableOpacity>

                    </View>
                  </Right>


                </ListItem>
              )
              )
            }
            <KeyboardAvoidingView style={styles.container}>
              <Text>Add friends here!</Text>
              {
                this.state.possibleFriends.map((fr, index) => (
                  <Button color='white'
                    key={fr}
                    title={`Add ${fr}`}
                    onPress={() =>
                      this.addFriend(index)
                    }
                  />
                )
                )
              }
      <TouchableOpacity style={styles.btntext} onPress={()=>this.save()}>
        <Text>Save</Text>
      </TouchableOpacity>                  
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  imageContainer: {
    width: null,
    height: null,
    aspectRatio: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(69,85,117,0.7)',
  },

  listContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,

  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    marginBottom: 20,
    paddingHorizontal: 5
  },
  infoContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    padding: 5,
  },
  removeBtn: {
    right: 20,
    height: 15,

  },
  btntext: {
    color: 'white',
  }
});
