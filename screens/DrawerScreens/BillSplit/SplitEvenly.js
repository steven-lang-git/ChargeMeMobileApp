import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  FlatList
} from 'react-native';
import {
  ListItem,
  CheckBox,
} from 'react-native-elements';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
import {TextInputMask} from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ButtonComponent from '../../../components/ButtonComponent'
import TextInputComponent from '../../../components/TextInputComponent'
import SearchableDropdown from "react-native-searchable-dropdown";
import * as firebase from "firebase";

let totalEmpty = false;
let nameEmpty = false;
let noFriends = '';
const{width} = Dimensions.get('window')

export default class SplitEvenly extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      total: 0,
      tip: 0,
      friends: [],
      selectedFriends: [],
      selectedFlat: [],
      tempArray: [],
      first:'',
      checked10: false,
      checked15: false,
      checked18: false,
      checked20: false,
      checkedCustom: false,
      checkedNo: true,
      disable: true,
    };
    totalEmpty = false;
    nameEmpty = false;
    noFriends = '';
  }

  //run when page first loads
  componentDidMount() {
    // console.log('getting data from database')
    //get current logged in user
    var uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + uid)
      .once("value", snapshot => {
        const nameUser = snapshot.val().firstName;
        this.setState({
          first: nameUser
        });
        // console.log('got users name')
      });

    //get users friends
    firebase
      .database()
      .ref("friendslist/" + uid)
      .child("currentFriends")
      .on("value", snapshot => {
        if (snapshot.val()) {
          const data = snapshot.val();
          this.setState({
            friends: snapshot.val()
          });
          // console.log('got friends')
        } else {
          const { friends } = this.state;
          console.log("used else");
          this.setState({
            friends: friends
          });
        }
      });
  }

  addFriend = index => {
    // console.log('adding friend: ', index)
    const { selectedFriends, friends, tempArray } = this.state;

    // And put friend in selectedFriends
    selectedFriends.push(friends[index]);

    // Pull friend out of friends
    friends.splice(index, 1);
    tempArray.splice(index, 1);
    // console.log('temp friends', tempArray)
    // Finally, update our app state
    this.setState({
      friends: friends,
      selectedFriends: selectedFriends,
      tempArray: tempArray
    });
  };

  removeFriend = index => {


    const { friends, selectedFriends } = this.state;
    // console.log('position: ', index)
    // console.log('removing friend: ', selectedFriends[index])

    // And put friend in friends
    friends.push(selectedFriends[index]);

    // Pull friend out of selectedFriends
    selectedFriends.splice(index, 1);

    // console.log('selectedFriends after removal', selectedFriends)

    // Finally, update our app state
    this.setState({
      friends: friends,
      selectedFriends: selectedFriends
    });
  };

  on10Toggle = (checked10) => {
    this.setState(() => ({checked10}));
    if(checked10==true){
      this.setState({tip: (this.state.total * 0.10).toFixed(2)})
      this.setState({checked15: false});
      this.setState({checked18: false});
      this.setState({checked20: false});
      this.setState({checkedCustom: false});
      this.setState({checkedNo: false});
    }
    else{
      if (this.state.checked20 == false
          && this.state.checked15 == false
          && this.state.checked18 == false
          && this.state.checkedCustom == false){
            this.setState({checkedNo:true})
          }
    }
  }
  on15Toggle = (checked15) => {
    this.setState(() => ({checked15}));
    if(checked15==true){
      this.setState({tip: (this.state.total * 0.15).toFixed(2)})
      this.setState({checked10: false});
      this.setState({checked18: false});
      this.setState({checked20: false});
      this.setState({checkedCustom: false});
      this.setState({checkedNo: false});
    }
    else{
      if (this.state.checked10 == false
          && this.state.checked20 == false
          && this.state.checked18 == false
          && this.state.checkedCustom == false){
            this.setState({checkedNo:true})
          }
    }
  }

  on18Toggle = (checked18) => {
    this.setState(() => ({checked18}));
    if(checked18==true){
      this.setState({tip: (this.state.total * 0.18).toFixed(2)})
      this.setState({checked10: false});
      this.setState({checked15: false});
      this.setState({checked20: false});
      this.setState({checkedCustom: false});
      this.setState({checkedNo: false});
    }
    else{
      if (this.state.checked10 == false
          && this.state.checked15 == false
          && this.state.checked20 == false
          && this.state.checkedCustom == false){
            this.setState({checkedNo:true})
          }
    }
  }

  on20Toggle = (checked20) => {
    this.setState(() => ({checked20}));
    if(checked20==true){
      this.setState({tip: (this.state.total * 0.20).toFixed(2)})
      this.setState({checked10: false});
      this.setState({checked15: false});
      this.setState({checked18: false});
      this.setState({checkedCustom: false});
      this.setState({checkedNo: false});
    }
    else{
      if (this.state.checked10 == false
          && this.state.checked15 == false
          && this.state.checked18 == false
          && this.state.checkedCustom == false){
            this.setState({checkedNo:true})
          }
    }
  }

  onCustomToggle = (checkedCustom) => {
    this.setState(() => ({checkedCustom}));
    if(checkedCustom==true){
      this.setState({checked10: false});
      this.setState({checked15: false});
      this.setState({checked18: false});
      this.setState({checked20: false});
      this.setState({checkedNo: false});
    }
    else{
      if (this.state.checked10 == false
          && this.state.checked15 == false
          && this.state.checked18 == false
          && this.state.checked20 == false){
            this.setState({checkedNo:true})
          }
    }
  }

  onNoToggle = (checkedNo) => {
    this.setState(() => ({checkedNo}));
    if(checkedNo==true){
      this.setState({tip: 0});
      this.setState({checked10: false});
      this.setState({checked15: false});
      this.setState({checked18: false});
      this.setState({checked20: false});
      this.setState({checkedCustom: false});
    }
    else{
      if (this.state.checked10 == false
          && this.state.checked15 == false
          && this.state.checked18 == false
          && this.state.checked20 == false
          && this.state.checkedCustom == false){
            this.setState({checkedNo:true})
          }
    }
  }

  showCustomField = () => {
    if(this.state.checkedCustom == true){
      return(
        <View style={styles.customContainer}>
          <TextInputMask
            type={'money'}
            options={{
              precision: 2,
              separator: '.',
              delimiter: ',',
              unit: '$',
              suffixUnit: ''
            }}
            value={this.state.tip}
            onChangeText={(customTip) => this.checkCustom(customTip)}
            style={[styles.input, {borderColor: '#35b0d2'}]}
            ref={(ref) => this.tipField = ref}
            placeholder="$0"
            placeholderTextColor="rgba(255,255,255,0.8)"
            keyboardType={'numeric'}
            returnKeyType='go'
          />
        </View>
      )
    }
  }

  //update total entered by user
  checkTotal(value){

    const numericTotal = this.totalField.getRawValue().toFixed(2);
    if(numericTotal == 0){
      totalEmpty = true;
    }
    else{
      totalEmpty = false;
    }
    this.setState({total: numericTotal, disable: false});
  }

  //update bill split name entered by user
  updateName(value){
    if(value == ''){
      nameEmpty = true;
    }
    else{
      nameEmpty = false;
    }
    this.setState({name: value, disable: false})
  }

  //update custom tip entered by user
  checkCustom(){
    const numericCust = this.tipField.getRawValue().toFixed(2);
    this.setState({tip: numericCust});
  }

  //function to handle when user clicks review button
  onSubmitBillSplit(){
    // console.log('reviewing bill split')
    // console.log('no friends: ', noFriends)
    // console.log('number of friends: ', this.state.selectedFriends.length)
    if(this.state.name == ''){
      nameEmpty = true;
    }
    if(this.state.total == 0){
      totalEmpty = true;
    }
    if(this.state.selectedFriends.length == 0){
      noFriends = 'Add Some Friends!';
    }
    if(this.state.selectedFriends.length > 0){
      noFriends = '';
    }

    this.forceUpdate();

    if(totalEmpty == false && nameEmpty == false && noFriends == ''){
      console.log("first total: " + this.state.total);
      console.log("first tip: " + this.state.tip)
      this.props.navigation.navigate('SplitEvenlyReview', {
                                                            name: this.state.name,
                                                            total: this.state.total,
                                                            tip: this.state.tip,
                                                            selectedFriends: this.state.selectedFriends
                                                          })
    }
  }

  render() {
    const { tempArray, disable, selectedFriends, selectedFlat} = this.state;
    var x;
    for (x in this.state.friends) {
      this.state.tempArray[x] = { id: x, name: this.state.friends[x] };
    }
    var y;
    for (y in this.state.selectedFriends) {
      this.state.selectedFlat[y] = { id: y, name: this.state.selectedFriends[y] };
    }
    // console.log('selected friends', selectedFriends)
    // console.log('selected flat', selectedFlat)
    // console.log('no friends: ', noFriends)
    return (

      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../assets/group-dinner.jpg')} style={styles.imageContainer}>

        <View style={styles.overlay} />
        <KeyboardAwareScrollView keyboardShouldPersistTaps='always' extraScrollHeight={130}>
          <View style={styles.infoContainer}>

            <View style= {{alignContent:'flex-start'}}>
              <Text style={styles.inputTitle}>Bill Split Name</Text>
            </View>
            <TextInputComponent
              empty = {nameEmpty}
              placeholder="'Sunday Brunch'"
              onChangeText={(name) => this.updateName(name)}
              returnKeyType='next'
            />

            <Text style={styles.inputTitle}>Total (including tax)</Text>
            <TextInputMask
              type={'money'}
              options={{
                precision: 2,
                separator: '.',
                delimiter: ',',
                unit: '$',
                suffixUnit: ''
              }}
              value={this.state.total}
              onChangeText={(total) => this.checkTotal(total)}
              style={[styles.input,{
                borderColor: totalEmpty == true
                  ? 'red'
                  : '#35b0d2',
              }]}
              ref={(ref) => this.totalField = ref}
              placeholder="$0"
              placeholderTextColor="rgba(255,255,255,0.8)"
              keyboardType={'numeric'}
              returnKeyType='go'
            />

            <Text style={styles.inputTitle}>Tip:</Text>

            <View style={styles.customCheckBoxContainer}>
              <View style = {styles.checkBoxContainer}>
                <View style={styles.optionContainer}>
                  <View style={styles.circleContainer}>
                    <CircleCheckBox
                      checked={this.state.checked10}
                      onToggle={this.on10Toggle}
                      outerColor='#35b0d2'
                      innerColor='#35b0d2'
                      filterSize= {20}
                      innerSize= {15}
                    />
                  </View>
                  <Text style={styles.btntext}> 10% </Text>
                  <Text style={styles.tipText}>(${(this.state.total * 0.10).toFixed(2)})</Text>
                </View>

                <View style={styles.optionContainer}>
                  <View style={styles.circleContainer}>
                    <CircleCheckBox
                      checked={this.state.checked18}
                      onToggle={this.on18Toggle}
                      outerColor='#35b0d2'
                      innerColor='#35b0d2'
                      filterSize= {20}
                      innerSize= {15}
                    />
                  </View>
                  <Text style={styles.btntext}> 18% </Text>
                  <Text style={styles.tipText}>(${(this.state.total * 0.18).toFixed(2)})</Text>
                </View>

                <View style={styles.optionContainer}>
                  <View style={styles.circleContainer}>
                    <CircleCheckBox
                      checked={this.state.checkedNo}
                      onToggle={this.onNoToggle}
                      outerColor='#35b0d2'
                      innerColor='#35b0d2'
                      filterSize= {20}
                      innerSize= {15}
                    />
                  </View>
                  <Text style={styles.btntext}> No Tip </Text>
                </View>

              </View>

              <View style={styles.checkBoxContainer}>

                <View style={styles.optionContainer}>
                  <View style={styles.circleContainer}>
                    <CircleCheckBox
                      checked={this.state.checked15}
                      onToggle={this.on15Toggle}
                      outerColor='#35b0d2'
                      innerColor='#35b0d2'
                      filterSize= {20}
                      innerSize= {15}
                    />
                  </View>
                  <Text style={styles.btntext}> 15% </Text>
                  <Text style={styles.tipText}>(${(this.state.total * 0.15).toFixed(2)})</Text>
                </View>

                <View style={styles.optionContainer}>
                  <View style={styles.circleContainer}>
                    <CircleCheckBox
                      checked={this.state.checked20}
                      onToggle={this.on20Toggle}
                      outerColor='#35b0d2'
                      innerColor='#35b0d2'
                      filterSize= {20}
                      innerSize= {15}
                    />
                  </View>
                  <Text style={styles.btntext}> 20% </Text>
                  <Text style={styles.tipText}>(${(this.state.total * 0.20).toFixed(2)})</Text>
                </View>

                <View style={styles.optionContainer}>
                  <View style={styles.circleContainer}>
                    <CircleCheckBox
                      checked={this.state.checkedCustom}
                      onToggle={this.onCustomToggle}
                      outerColor='#35b0d2'
                      innerColor='#35b0d2'
                      filterSize= {20}
                      innerSize= {15}
                    />
                  </View>
                  <Text style={styles.btntext}> Custom: </Text>
                  {this.showCustomField()}
                </View>
              </View>
            </View>

            <Text style={styles.inputTitle}>Bill Split Friends:</Text>

            <View style={styles.friendsContainer}>
              <View style={{height: selectedFriends.length*50}}>
                <FlatList
                  data={this.state.selectedFlat}
                  extraData={this.state}
                  renderItem={({item}) =>
                    <View style={styles.searchboxContainer}>
                    <Text style={{marginLeft: 25,marginTop: 9,color: '#35b0d2', fontWeight: 'bold',fontSize: 15, textAlign: 'center'}}>{item.name}</Text>
                    <CheckBox
                      right={true}
                      title='Remove'
                      iconRight
                      iconType='material'
                      containerStyle={{
                                        backgroundColor: 'transparent',
                                        height: 40,
                                        margin: 0,
                                        borderColor: 'transparent'}}
                      textStyle={{color: '#35b0d2', fontWeight: 'normal', fontSize: 12}}
                      uncheckedIcon='clear'
                      size= {22}
                      uncheckedColor='red'
                      checked={false}
                      onIconPress={() => this.removeFriend(eval(JSON.stringify(item.id)))}
                    />

                    </View>
                  }
                  keyExtractor={item => item.id}
                />
              </View>
                <SearchableDropdown
                  onTextChange={(value) => this.searchFriends(value)}
                  onItemSelect={item =>this.addFriend(eval(JSON.stringify(item.id)))}
                  containerStyle={{ padding: 5 }}
                  textInputStyle={{
                    fontSize: 15,
                    color:'#fff',
                    textAlign: 'center',
                    marginTop: 10,
                    height: 40,
                    borderWidth: 2,
                    borderColor: '#35b0d2',
                    borderRadius: 20,
                    width: width/1.2,
                    backgroundColor: 'rgba(255,255,255,0.2)',

                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderColor: 'rgba(255,255,255,0.2)',
                    borderWidth: 1,
                    borderRadius: 5
                  }}
                  itemTextStyle={{ color: "white", textAlign: 'center', fontSize: 15,}}
                  itemsContainerStyle={{ maxHeight: 150 }}
                  items={this.state.tempArray}
                  placeholder="Add friends!"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  autoCorrect= {false}
                  resetValue={false}
                  underlineColorAndroid="transparent"
                />

              <Text style={styles.errorMessage}>{noFriends}</Text>
              <ButtonComponent
                text='REVIEW'
                onPress={() => this.onSubmitBillSplit()}
                disabled={disable}
                primary={true}
              />
            </View>
          </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </SafeAreaView>

    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
  },
  errorMessage:{
    color: 'red',
  },
  inputBoxContainer:{
    flex:8,
  },
  flatListContainer:{
    height: 100,
  },
  friendsContainer: {
    flex:1,
    alignItems: 'center',
  },
  searchboxContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    width: width/1.15,
    height: 40,
    borderColor: '#35b0d2',
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 10,
  },
  checkBoxContainer: {
      height: 150,
    justifyContent:'space-between',
  },
  customCheckBoxContainer: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-around',
  },
  circleContainer:{
    height: 26,
    width:26,
  },
  optionContainer:{
    flexDirection:'row',
    alignItems: 'center'
  },
  imageContainer: {
      resizeMode:'cover',
      flex:1,
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(69,85,117,0.7)',
  },
  infoContainer: {
    flex: 2,
    width: width,
    padding:20,
  },
  input: {
    height:40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color:'#fff',
    marginBottom: 5,
    paddingHorizontal:10,
    borderWidth: 2,
    borderRadius: 20,
  },
  customContainer: {
    width: width / 4,
  },
  inputTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
    textAlign: 'left',
  },
  tipText:{
    color: 'white',
    fontSize: 15,
    opacity: 0.8,
  },
  btntext: {
    color: 'white',
    fontSize: 18,
  },
});
