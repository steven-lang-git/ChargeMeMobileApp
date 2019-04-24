import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  ImageBackground,
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
import { Avatar, ListItem } from 'react-native-elements';


const {width} = Dimensions.get('window')

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      firstName:'',
      lastName:'',
      username:''
    }
    currentTransactions=[]
  }

    componentDidMount() {
      var uid = firebase.auth().currentUser.uid;

      // gets Current Transactions
      firebase
      .database()
      .ref()
      .child("currentTransactions/" + uid)
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapShot) => {
          currentTransactions.push({
                              key: childSnapShot.key,
                              amount: childSnapShot.val().amount,
                              charging: childSnapShot.val().charging,
                              date: childSnapShot.val().date,
                              name: childSnapShot.val().name,
                              paying: childSnapShot.val().paying,
                            })
        });
        this.forceUpdate();
      })

      // gets user data
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


    renderItem = ({item})=> (
    <ListItem
    containerStyle= {styles.blueButton}
    title={item.name}
    titleStyle={{color:'white', fontWeight:'bold'}}
    subtitle={item.date }
    subtitleStyle={{color:'white'}}
    rightElement={item.amount}
    rightTitle={"Paying "+ item.charging}
    rightTitleStyle={{color:'white'}}
    chevronColor="white"
    chevron
    />
  )


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../assets/blue.jpg')} style={styles.imageContainer}>
          <View style={styles.overlay} />


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


            <View style={styles.infoContainer}>
              <FlatList style={{flex:1}}
                keyExtractor={this.keyExtractor}
                data={currentTransactions}
                renderItem={this.renderItem}
              />
            </View>

          </View>
        </KeyboardAwareScrollView>
      </View>
      </ImageBackground>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
container:{
  flex: 1,
  alignItems: "center",
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
  color: "white",
},
infoContainer:{
  flex: 2,
  padding: 20,
  justifyContent: "flex-end",
  width:width,
  marginTop:20,
},
blueButton:{
  padding:15,
  backgroundColor: '#202646',
  borderRadius:10,
  borderWidth: 1,
  borderColor: '#35b0d2',
  backgroundColor: '#35b0d2',
  marginTop:10,
},
overlay:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(69,85,117,0.7)',
},
imageContainer:{
    resizeMode:'cover',
    flex:1,
},
});
