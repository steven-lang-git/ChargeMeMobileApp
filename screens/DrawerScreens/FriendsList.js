import React from "react";
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  TextInput,
  Button,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  Keyboard
} from "react-native";
import { Header, Left, Right, Icon, ListItem, List } from "native-base";
const { width } = Dimensions.get("window");
import * as firebase from "firebase";
import AwesomeAlert from 'react-native-awesome-alerts';
import SearchableDropdown from "react-native-searchable-dropdown";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ButtonComponent from '../../components/ButtonComponent'


let currentFriends = []
let possibleFriends = []
let tempArray = []
let showAlert = false

export default class FriendsList extends React.Component {
  constructor(props) {
    super(props);

    possibleFriends = []
    currentFriends = []
    tempArray = []
    showAlert = false
  }

  save() {
    //show confirmation alert
    showAlert = true
    this.forceUpdate();
    var uid = firebase.auth().currentUser.uid;

    //clear out user's current friends
    firebase
      .database()
      .ref("friendslist/" + uid + "/currentFriends")
      .set(" ");

    //write in each current friend
    for (let i = 0; i < currentFriends.length; i++){
      firebase
        .database()
        .ref("friendslist/" + uid + "/currentFriends/"+ currentFriends[i].key)
        .set({
                firstName: currentFriends[i].firstName,
                lastName: currentFriends[i].lastName,
                username: currentFriends[i].username
              });
    }
  }
  //function to hide confirmation alert
  hideAlert = () => {
    showAlert = false;
    this.forceUpdate();
  };

  //function to add friend to current friends
  addFriend = index => {
    // And put friend in currentFriends
    currentFriends.push(possibleFriends[index]);

    // Pull friend out of possibleFriends
    possibleFriends.splice(index, 1);
    tempArray.splice(index, 1);
    this.forceUpdate();
  };

  //function to remove friend from current friends
  removeFriend = index => {
    // And put friend in possibleFriends
    possibleFriends.push(currentFriends[index]);

    // Pull friend out of currentFriends
    currentFriends.splice(index, 1);
    this.forceUpdate();

  };

  //function that is called everytime page mounts
  componentDidMount() {
    // get current user's uid
    var uid = firebase.auth().currentUser.uid;

    // load their current friends
    firebase
      .database()
      .ref("friendslist/" + uid)
      .child("currentFriends")
      .once("value")
      .then((snapshot) => {

        // for each friend
        snapshot.forEach((childSnapShot) => {
          //save their first name, last name, user id, and username
          currentFriends.push({
                              key: childSnapShot.key,
                              firstName: childSnapShot.val().firstName,
                              lastName: childSnapShot.val().lastName,
                              username: childSnapShot.val().username,
                            })

        });

      })

      //load possible friends
      firebase
        .database()
        .ref()
        .child("users")
        .once("value")
        .then ((snapshot) => {

          // for each user
          snapshot.forEach((childSnapShot) => {
            //save their first name, last name, user id, and username
            possibleFriends.push({
                                key: childSnapShot.key,
                                firstName: childSnapShot.val().firstName,
                                lastName: childSnapShot.val().lastName,
                                username: childSnapShot.val().username,
                              })

          });

            //remove the current user from the list
            possibleFriends.splice(possibleFriends.map((el) => el.key).indexOf(uid), 1);

            //remove current friends from possible friends
            if(currentFriends.length > 0){
              var y;
              for( y in currentFriends){
                possibleFriends.splice(possibleFriends.map((el) => el.key).indexOf(currentFriends[y].key), 1);
              }
            }
            this.forceUpdate();
        })
  }

  render() {
    var x;
    for (x in possibleFriends) {
      var name = possibleFriends[x].firstName + " " + possibleFriends[x].lastName
      tempArray[x] = { id: x, name: name };
    }

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("../../assets/friends.jpeg")}
          style={styles.imageContainer}
        >
          <View style={styles.overlay} />
          <KeyboardAwareScrollView keyboardShouldPersistTaps='always' extraScrollHeight={130}>
          <Header
            style={{ backgroundColor: "transparent", borderBottomWidth: 0 }}
          >
            <Left>
              <Icon
                name="bars"
                type="FontAwesome"
                onPress={() => this.props.navigation.openDrawer()}
              />
            </Left>
          </Header>
          <StatusBar barStyle="light-content" />
          {/* <Text> We have {this.state.currentFriends.length} friends!</Text> */}

          <Button
            color="white"
            title="Back to home"
            onPress={() => this.props.navigation.navigate("PastTransactions")}
          />

          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <SearchableDropdown
                //  onTextChange={text => alert(text)}
                onItemSelect={item =>
                  this.addFriend(eval(JSON.stringify(item.id)))
                }
                containerStyle={{ padding: 5 }}
                textInputStyle={{
                  fontSize: 15,
                  color:'#fff',
                  textAlign: 'center',
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#35b0d2",
                  borderRadius: 5,
                  width: width/2,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderColor: "#35b0d2",
                  borderWidth: 1,
                  borderRadius: 5
                }}
                itemTextStyle={{ color: "white", textAlign: 'center', fontSize: 15, }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={tempArray}
                defaultIndex={2}
                placeholder="Search for friends!"
                placeholderTextColor="rgba(255,255,255,0.8)"
                resetValue={false}
                underlineColorAndroid="transparent"
              />
            </View>

            <Text> Currently our friends are:</Text>
            {currentFriends.map((friend, index) => (
              <ListItem style={styles.listContainer}>
                <Left>
                  <Text style={styles.btntext} key={friend.username}>
                    {" "}
                    {`${friend.firstName + ' ' + friend.lastName}`}{" "}
                  </Text>
                </Left>
                <Right>
                  <View style={styles.removeBtn}>
                    <TouchableOpacity
                      style={styles.btntext}
                      onPress={() => this.removeFriend(index)}
                      key={friend.username}
                    >
                      <Text style={styles.btntext}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </Right>
              </ListItem>
            ))}

            <KeyboardAvoidingView style={styles.container}>
              <Text>Add friends here!</Text>
              {possibleFriends.map((friend, index) => (

                <Button
                  color="white"
                  key={friend.username}
                  title={`Add ${friend.firstName + " " + friend.lastName}`}
                  onPress={() => this.addFriend(index)}
                />
              ))}

              <View style={styles.buttonContainer}>
                <ButtonComponent
                  text='SAVE'
                  onPress={() => this.save()}
                  disabled={false}
                  primary={true}
                />
              </View>

            </KeyboardAvoidingView>
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Friends List Updated"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showConfirmButton={true}
              confirmText="Gotcha"
              confirmButtonColor='#35b0d2'
              onConfirmPressed={() => {
                this.hideAlert();
              }}
            />
          </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },

  imageContainer: {
    width: null,
    height: null,
    aspectRatio: 1,
    resizeMode: "cover",
    justifyContent: "center",
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(69,85,117,0.7)"
  },
  listContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: width
  },
  buttonContainer: {
    width: width/2,
    flex: 1,
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    marginBottom: 20,
    paddingHorizontal: 5
  },
  infoContainer: {
    position: "relative",
    left: 0,
    right: 0,
    padding: 5
  },
  removeBtn: {
    right: 20,
    height: 15
  },
  btntext: {
    color: 'white',
  },
});
