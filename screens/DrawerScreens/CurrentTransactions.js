import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  FlatList,
  Button,
} from "react-native";
import { Header, Left, Icon } from "native-base";
import * as firebase from "firebase";

import ButtonComponent from "../../components/ButtonComponent";
import { List, ListItem, ButtonGroup } from "react-native-elements";
import Modal from "react-native-modal";
import MyModal from './MyModal';
const { width, height } = Dimensions.get("window");




class MyItem extends React.Component { 
  _onPress = () => { 
      this.props.onPressItem(this.props.item); 
  }; 

  _renderPaying = () =>{
 
   return <ListItem 
    {...this.props}
    onPress={this._onPress}
    containerStyle= {styles.redButton}   
    title={this.props.item.name}
      titleStyle={{color:'white', fontWeight:'bold'}}
      subtitle={this.props.item.date }
      subtitleStyle={{color:'white'}}
      rightElement={this.props.item.amount}
      rightTitle={"Charging "}
      rightTitleStyle={{color:'white'}}
      chevronColor="white"
      chevron
    
      />
  }

  render() { 
      return(

          // this.props._renderCharging(this.props.item)
         
          this._renderPaying()
       
      ) 
  } 
}






let transactionData =[]
let tempArray =[]
export default class CurrentTransactions extends React.Component {
  static navigationOptions = {
    drawerIcon: tintColor => (
      <Icon
        name="clock-o"
        type="FontAwesome"
        style={{ fontSize: 24, color: tintColor }}
      />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      first: '',
      name:'',
      isModalVisible: false,
      selectedItem:null
    };
    transactionData= [],
    tempArray =[],
    this.updateIndex = this.updateIndex.bind(this);
  };


  
//updates the three option menu at the top
updateIndex(selectedIndex) {
  this.setState({ selectedIndex });
};

renderMain(item)
{
  const {selectedIndex}= this.state;
  var uid = firebase.auth().currentUser.uid;
  var name;

  if(selectedIndex==0){
  if(item.paying==uid){
    for(var x in tempArray){
      if(tempArray[x].key==item.charging){
      name=tempArray[x].first;
      }
    };  
    return this._renderPaying(item,name)
    }
  else if(item.charging==uid)
  {
    for(var x in tempArray){
      if(tempArray[x].key==item.paying){
      name=tempArray[x].first;
      }
    };
    return this._renderCharging(item,name)
  
  }
}
if(selectedIndex==1){
  if(item.paying==uid){
    for(var x in tempArray){
      if(tempArray[x].key==item.charging){
      name=tempArray[x].first;
      }
    };
  
    return this._renderPaying(item,name)
  }
}
else if(selectedIndex==2){
  if(item.charging==uid){
    for(var x in tempArray){
      if(tempArray[x].key==item.paying){
      name=tempArray[x].first;
      }
    };
    return this._renderCharging(item,name)
  }
}

};

_onPressItem = (item) => { 
  this._showModal(item);
};

//to close modal
_toggleModal = () =>
this.setState({ isModalVisible: !this.state.isModalVisible });

_showModal = (item) => this.setState({ isModalVisible: true, selectedItem: item });

_hideModal = () => this.setState({isModalVisible:false})

_renderPaying = (item,name) => (
  <ListItem 
    onPress={this._onPressItem(item)}
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
  
    />
);

_renderCharging = (item,name) => (
  <ListItem 
  onPress={this._onPressItem(item)}
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
)

//function that is called everytime page mounts 
componentDidMount(){
  var uid = firebase.auth().currentUser.uid;
  firebase
  .database()
  .ref()
  .child("currentTransactions/" + uid)
  .once("value")
  .then((snapshot) => {

    // for each friend
    snapshot.forEach((childSnapShot) => {
      //save their transaction information
      transactionData.push({
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

}
_renderButton = (text, onPress) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.button}>
      <Text>{text}</Text>
    </View>
  </TouchableOpacity>
);


_renderModalContent = () => (
  <View style={styles.modalContent}>
    <Text>work?</Text>
    {this._renderButton('Close', this._toggleModal)}
</View>
  );

keyExtractor = (item,index) =>index.toString()


renderItem = ({item})=> ( 
//

// this.renderMain(item)
  <MyItem 
  item={item}
  onPressItem={()=>this._onPressItem(item)}
  />
);

  render() {
    
    const buttons = ["All", "Paying", "Requesting"];
    const { selectedIndex } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("../../assets/group-dinner.jpg")}
          style={styles.imageContainer}
        >
          <View style={styles.overlay} />
          <View style={styles.mainContainer}>
          <Text style={{color:'white', fontWeight:'bold'}}> Current Transactions</Text>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{ height: 30 }}
              />
                 <View style={styles.infoContainer}>

            <FlatList style={{flex:1}}
              keyExtractor={this.keyExtractor}
              data={transactionData}
              renderItem={this.renderItem}
            />

        { this.state.isModalVisible && <MyModal selectedItem={this.state.selectedItem} modalVisible={this.state.isModalVisible} hideModal={this._toggleModal} /> }

            </View>
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
  },
  mainContainer:{
    flex: 1 ,
    alignItems: "center",
    justifyContent:"center",
    position:"relative",
    width:width,
    height: height,
    marginTop:50,

  },
  imageContainer: {
    resizeMode: "cover",
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(69,85,117,0.7)"
  },
  infoContainer: {
    flex: 2,
    padding: 20,
    justifyContent: "flex-end",
    width:width,
    marginTop:20,


  },
  blueButton: {
  	padding:15,
  	backgroundColor: '#202646',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#35b0d2',
    backgroundColor: '#35b0d2',
    marginTop:10,
    marginBottom: 10,
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
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
