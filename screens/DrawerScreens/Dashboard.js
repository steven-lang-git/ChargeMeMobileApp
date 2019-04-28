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
import DashboardStatComponent from '../../components/DashboardStatComponent'



const {width} = Dimensions.get('window')

let activity=''

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      firstName:'',
      lastName:'',
      username:''
    }
    currentTransactions=[]
    pastTransactions=[]
    tempArray=[]
    currFriends=[]
    currTransCount = 0

  }

    componentDidMount() {
      var uid = firebase.auth().currentUser.uid;

      // gets Current Transactions
      firebase
      .database()
      .ref("currentTransactions/" + uid)
      .orderByKey()
      .limitToLast(3)
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

        //get current transaction count
        firebase
        .database()
        .ref("currentTransactions/" + uid)
        .once("value")
        .then((snapshot) => {
          currTransCount = snapshot.numChildren()
          if(currTransCount == 0){

            activity = '... no recent activity :('
            this.forceUpdate();
          }
        })





        // gets all current friends
        firebase
        .database()
        .ref("friendslist/" + uid)
        .child("currentFriends")
        .once("value")
        .then ((snapshot) => {
          // for each user
          snapshot.forEach((childSnapShot) => {

              currFriends.push({
                key: childSnapShot.key,
                first: childSnapShot.val().firstName,
              })
              this.setState(
                {
                  currFriends:currFriends
                }
              )
            });
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
          username: user,
        })

      });
    }



  renderMain(item){
  const {selectedIndex}= this.state;
  var uid = firebase.auth().currentUser.uid;
  var name;
    if(item.paying==uid){
      for(var x in currFriends){
        if(currFriends[x].key==item.charging){
        name=currFriends[x].first;
        }
      };
      return <ListItem
      containerStyle= {styles.blueButton}
      title={item.name}
      titleStyle={{color:'white', fontWeight:'bold'}}
      subtitle={item.date }
      subtitleStyle={{color:'white'}}
      rightElement={"$" + (item.amount)}
      rightTitle={"Paying "+name}
      rightTitleStyle={{color:'white', width: 70}}


      />;  }
    else if(item.charging==uid)
    {
      for(var x in currFriends){
        if(currFriends[x].key==item.paying){
        name=currFriends[x].first;
        }
      };
      return <ListItem
      containerStyle= {styles.redButton}
      title={item.name}
      titleStyle={{color:'white', fontWeight:'bold'}}
      subtitle={item.date }
      subtitleStyle={{color:'white'}}
      rightElement={"$" + (item.amount)}
      rightTitle={"Charging "+name}
      rightTitleStyle={{color:'white', width: 70}}

      />
    }
};





  renderItem = ({item})=> (
    this.renderMain(item)
    )
  render() {

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../assets/blue.jpg')} style={styles.imageContainer}>
          <View style={styles.overlay} />


      <View style={styles.container}>

          <Header>
            <Left>
              <Icon name="bars" type="FontAwesome" onPress={()=>this.props.navigation.openDrawer()}/>
            </Left>
          </Header>

          <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always' extraScrollHeight={130}>

            <View style={styles.userContainer}>
              <Avatar
                size = "xlarge"
                rounded title = {this.state.initials}
                containerStyle={{marginLeft: 10, marginTop: 10}}
              />

              <View style={styles.nameContainer}>
                <Text style={styles.name}>Welcome, {this.state.firstName}</Text>
                <Text style={styles.username}>@{this.state.username}</Text>
              </View>
            </View>


            <View style={styles.userContainer}>


                <DashboardStatComponent
                  onPress={() => this.props.navigation.navigate('FriendsList')}
                  text={"\n" +"Friends:"}
                  secondText={String(currFriends.length)}
                />


                <DashboardStatComponent
                  onPress={() => this.props.navigation.navigate('PastTransactions')}
                  text={"Past" + "\n" + "Transactions:"  }
                  secondText={String(pastTransactions.length)}
                />

                <DashboardStatComponent
                  onPress={() => this.props.navigation.navigate('CurrentTransactions')}
                  text={"Current" + "\n" + "Transactions:" }
                  secondText={String(currTransCount)}
                />


            </View>



            <View style={styles.infoContainer}>
              <Text style={styles.text}>Your Recent Activity:</Text>
              <Text style ={{marginTop: 15, color:'white', textAlign: 'center', fontSize: 18}}>{activity}</Text>
              <FlatList style={{flex:1}}
                keyExtractor={this.keyExtractor}
                data={currentTransactions}
                renderItem={this.renderItem}
              />
            </View>
            </KeyboardAwareScrollView>
          </View>

      </View>
      </ImageBackground>
    </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
container:{
  flex: 1,
},
nameContainer:{
  flex: 1,
  alignItems: 'center',
  paddingBottom: 20,
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
name:{
  fontSize: 40,
  color: "white",
  textAlign: 'center',
},
username:{
  fontSize: 20,
  color: "white",
  textAlign: 'center',
},
text:{
  fontSize: 25,
  color: "white",
},
userContainer:{
  flex: 1,
  flexDirection: 'row',
  padding: 10,
  alignItems: 'flex-end',
  justifyContent: 'space-evenly',
},
infoContainer:{
  flex: 2,
  padding: 20,
  justifyContent: "flex-end",
  width:width,
},
button:{
  height: 100,
  width: 100,
  borderRadius: 50,
  backgroundColor: "rgba(255,255,255,0.2)",
  justifyContent: 'center',
  alignItems: 'center',
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
redButton: {
  padding:15,
  backgroundColor: '#202646',
  borderRadius:10,
  borderWidth: 1,
  borderColor: 'coral',
  backgroundColor: 'coral',
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
