import React from 'react';
import { ActivityIndicator, AppRegistry, StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, StatusBar, TextInput, Button, Dimensions, Image, ImageBackground, TouchableOpacity, TouchableHighlight, Keyboard } from 'react-native';
import { Header, Left, Right, Icon, ListItem, List } from 'native-base'
const { width } = Dimensions.get('window')

export default class SelectFriend extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        possibleFriends: [
          'Angela',
          'Steven',
          'Nikki',
          'Jasmin',
        ],
        currentFriends: [
          'John',
          'Jason',
        ],
      }
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
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="users" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
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
              this.props.navigation.navigate('Home')
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
            <Text>Current Friends Selected for your Bill:</Text>
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
                        }>   
                        <Text style={styles.btntext}>Remove</Text>
                       </TouchableOpacity>
                    </View>
                  </Right>


                </ListItem>
          )
          )
        }
            <KeyboardAvoidingView style={styles.container}>
            <Text>Add Friends to your Bill!</Text>
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
    color:'white',
  }
});
