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
import SearchableDropdown from "react-native-searchable-dropdown";

export default class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleFriends: [],
      currentFriends: [],
      tempArray: [],
      firstName: " ",
      first: ""
    };
  }

  save() {
    const { currentFriends, possibleFriends } = this.state;
    var uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("friendslist/" + uid + "/possibleFriends")
      .set(possibleFriends);
    firebase
      .database()
      .ref("friendslist/" + uid + "/currentFriends")
      .set(currentFriends);
  }

  addFriend = index => {
    const { currentFriends, possibleFriends, tempArray } = this.state;

    // And put friend in currentFriends
    currentFriends.push(possibleFriends[index]);

    // Pull friend out of possibleFriends
    possibleFriends.splice(index, 1);
    tempArray.splice(index, 1);
    // Finally, update our app state
    this.setState({
      currentFriends: currentFriends,
      possibleFriends: possibleFriends,
      tempArray: tempArray
    });
  };

  removeFriend = index => {
    const { currentFriends, possibleFriends } = this.state;

    // And put friend in possibleFriends

    possibleFriends.push(currentFriends[index]);

    // Pull friend out of currentFriends
    currentFriends.splice(index, 1);

    // Finally, update our app state
    this.setState({
      currentFriends: currentFriends,
      possibleFriends: possibleFriends
    });
  };

  componentDidMount() {
    var uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + uid)
      .once("value", snapshot => {
        const nameUser = snapshot.val().firstName;
        this.setState({
          first: nameUser
        });
      });

    firebase
      .database()
      .ref("friendslist/" + uid)
      .child("currentFriends")
      .on("value", snapshot => {
        if (snapshot.val()) {
          const data = snapshot.val();
          this.setState({
            currentFriends: snapshot.val()
          });
        } else {
          const { currentFriends } = this.state;
          console.log("used else");
          this.setState({
            currentFriends: currentFriends
          });
        }
      });

    firebase
      .database()
      .ref("friendslist/" + uid)
      .child("possibleFriends")
      .on("value", snapshot => {
        const { possibleFriends } = this.state;
        const { first } = this.state;
        possibleFriends.splice(possibleFriends.indexOf(first), 1);
        if (snapshot.val()) {
          const data = snapshot.val();
          this.setState({
            possibleFriends: snapshot.val()
          });
        } else {
          this.setState({
            possibleFriends: possibleFriends
          });
        }
      });

    firebase
      .database()
      .ref()
      .child("friendslist")
      .once("value", snapshot => {
        const { possibleFriends, currentFriends } = this.state;
        if (snapshot.child(uid).exists()) {
          this.setState({
            possibleFriends: possibleFriends,
            currentFriends: currentFriends
          });
        } else {
          snapshot.child(uid).ref.push(possibleFriends);
          snapshot.child(uid).ref.push(currentFriends);
        }
      });
  }
  render() {
    const { tempArray, possibleFriends } = this.state;
    var x;
    for (x in this.state.possibleFriends) {
      this.state.tempArray[x] = { id: x, name: this.state.possibleFriends[x] };
    }

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("../assets/friends.jpeg")}
          style={styles.imageContainer}
        >
          <View style={styles.overlay} />
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
                //  {this.state.currentFriends.map((friend, index) => (this.addFriend(index)))}
                containerStyle={{ padding: 5 }}
                textInputStyle={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#35b0d2",
                  borderRadius: 5
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: "transparent",
                  borderColor: "#35b0d2",
                  borderWidth: 1,
                  borderRadius: 5
                }}
                itemTextStyle={{ color: "#35b0d2" }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={this.state.tempArray}
                defaultIndex={2}
                placeholder="Search for friends!"
                resetValue={false}
                underlineColorAndroid="transparent"
              />
            </View>

            <Text> Currently our friends are:</Text>
            {this.state.currentFriends.map((friend, index) => (
              <ListItem style={styles.listContainer}>
                <Left>
                  <Text style={styles.btntext} key={friend}>
                    {" "}
                    {`${friend}`}{" "}
                  </Text>
                </Left>
                <Right>
                  <View style={styles.removeBtn}>
                    <TouchableOpacity
                      style={styles.btntext}
                      onPress={() => this.removeFriend(index)}
                      key={friend}
                    >
                      <Text style={styles.btntext}>{`Remove ${friend}`}</Text>
                    </TouchableOpacity>
                  </View>
                </Right>
              </ListItem>
            ))}
            <KeyboardAvoidingView style={styles.container}>
              <Text>Add friends here!</Text>
              {this.state.possibleFriends.map((fr, index) => (
                <Button
                  color="white"
                  key={fr}
                  title={`Add ${fr}`}
                  onPress={() => this.addFriend(index)}
                />
              ))}
              <TouchableOpacity
                style={styles.btntext}
                onPress={() => this.save()}
              >
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
    color: "white"
  }
});