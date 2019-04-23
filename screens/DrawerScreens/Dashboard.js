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
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="check-circle" type="FontAwesome" style={{fontSize:24, color:tintColor}}/>
    )
  }
  constructor(props) {
    super(props)
    this.state = {
      firstName:'',
      lastName:'',
      username:''

    }
    currentTransactions=[]
    tempArray=[]
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
        firebase
        .database()
        .ref()
        .child("users")
        .once("value")
        .then ((snapshot) => {
          // for each user
          snapshot.forEach((childSnapShot) => {
           
              tempArray.push({
                key: childSnapShot.key,
                first: childSnapShot.val().firstName,
              })
              this.setState(
                {
                  tempArray:tempArray
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
          username: user
        })

      });
    }



  renderMain(item)
{
  const {selectedIndex}= this.state;
  var uid = firebase.auth().currentUser.uid;
  var name;

  if(item.paying==uid){
    for(var x in tempArray){
      if(tempArray[x].key==item.charging){
      name=tempArray[x].first;
      }
    };  
    return <ListItem 
    containerStyle= {styles.blueButton}
    title={item.name}
    titleStyle={{color:'white', fontWeight:'bold'}}
    subtitle={item.date }
    subtitleStyle={{color:'white'}}
    rightElement={item.amount}
    rightTitle={"Paying "+name}
    rightTitleStyle={{color:'white'}}
    chevronColor="white"
    chevron
  
    />;  }
  else if(item.charging==uid)
  {
    for(var x in tempArray){
      if(tempArray[x].key==item.paying){
      name=tempArray[x].first;
      }
    };
    return <ListItem 
    containerStyle= {styles.redButton}   
    title={item.name}
    titleStyle={{color:'white', fontWeight:'bold'}}
    subtitle={item.date }
    subtitleStyle={{color:'white'}}
    rightElement={item.amount}
    rightTitle={"Charging "+name}
    rightTitleStyle={{color:'white'}}
    chevronColor="white"
    chevron
  
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
redButton: {
  padding:15,
  backgroundColor: '#202646',
  borderRadius:10,
  borderWidth: 1,
  borderColor: 'coral',
  backgroundColor: 'coral',
  marginTop:10,
  marginBottom: 10,
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
