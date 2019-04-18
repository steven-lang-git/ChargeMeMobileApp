import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  FlatList,
  Picker
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import TextInputComponent from '../../../components/TextInputComponent'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ButtonComponent from '../../../components/ButtonComponent'
import SearchableDropdown from "react-native-searchable-dropdown";
import * as firebase from "firebase";
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
import {TextInputMask} from 'react-native-masked-text';
import {
  ListItem,
  CheckBox,
} from 'react-native-elements';

let nameEmpty = false
let taxEmpty = false
let itemNameEmpty = false
let itemPriceEmpty = false
let noFriends = '';
let noItems= '';
let tempArray = [];
let tempItemArray = [];
let itemTotal = 0;
const{width} = Dimensions.get('window')

export default class SplitByItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      tax: 0,
      tip: 0,
      subtotal: 0,
      total: 0,
      items: [],
      friends: [],
      selectedFriends: [],
      selectedFlat: [],
      first:'',
      checked10: false,
      checked15: false,
      checked18: false,
      checked20: false,
      checkedCustom: false,
      checkedNo: true,
      disable: true,
      itemName: '',
      itemPrice: 0,
      quantity: 1,
    };
    taxEmpty = false;
    nameEmpty = false;
    itemNameEmpty = false;
    itemPriceEmpty = false
    noFriends = '';
    noItems = '';
    tempArray = [];
    tempItemArray = [];
    itemTotal = 0;
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
      .once("value")
      .then((snapshot) => {

        var friendsArray = []
        // for each friend
        snapshot.forEach((childSnapShot) => {
          //save their first name, last name, user id, and username
          friendsArray.push({
                              key: childSnapShot.key,
                              firstName: childSnapShot.val().firstName,
                              lastName: childSnapShot.val().lastName,
                              username: childSnapShot.val().username,
                            })

        });
        this.setState({friends: friendsArray})
      })
  }

  addFriend = index => {
    noFriends = ''
    this.forceUpdate();
    const { selectedFriends, friends } = this.state;

    // And put friend in selectedFriends
    selectedFriends.push(friends[index]);

    // Pull friend out of friends
    friends.splice(index, 1);
    tempArray.splice(index, 1);

    // Finally, update our app state
    this.setState({
      friends: friends,
      selectedFriends: selectedFriends
    });
  };

  removeFriend = index => {
    const { friends, selectedFriends } = this.state;

    // And put friend in friends
    friends.push(selectedFriends[index]);

    // Pull friend out of selectedFriends
    selectedFriends.splice(index, 1);

    // Finally, update our app state
    this.setState({
      friends: friends,
      selectedFriends: selectedFriends
    });
  };

  //function to handle pressing remove item button
  removeItem = (index) => {
    const{ items } = this.state;

    console.log(items[index].price)

    itemTotal =  itemTotal - parseInt(items[index].price)

    console.log('itemTotal: ', itemTotal)

    items.splice(index,1);

    this.setState({items: items, subtotal: itemTotal})
  }

  //function to handle pressing add item icon
  addItem = () => {
    noItems = ''
    this.forceUpdate();
    console.log('quantity: ', this.state.quantity)
    if(this.state.itemName == ''){
      itemNameEmpty = true
    }
    const numericPrice = this.itemPriceField.getRawValue().toFixed(2);
    if(numericPrice == '0.00'){
      itemPriceEmpty = true
    }

    this.forceUpdate();

    if(itemNameEmpty == false && itemPriceEmpty == false){

      for(let x = 0; x < this.state.quantity; x++){
        this.state.items.push({name: this.state.itemName, price: parseInt(this.state.itemPrice)})
        itemTotal =  itemTotal + parseInt(this.state.itemPrice)
        //console.log('item total: ', itemTotal)
      }

      this.setState({itemName: '', itemPrice: 0, quantity: 1, subtotal: itemTotal})
      console.log('items: ', this.state.items)
      console.log('item total: ', itemTotal)
    }
  }

  //update bill split name entered by user
  updateName = value =>{
    if(value == ''){
      nameEmpty = true;
    }
    else{
      nameEmpty = false;
    }
    this.setState({name: value, disable: false})
  };

  //update tax entered by user
  checkTax = value => {

    const numericTax = this.taxField.getRawValue().toFixed(2);
    if(numericTax == 0){
      taxEmpty = true;
    }
    else{
      taxEmpty = false;
    }
    this.setState({tax: numericTax, disable: false, subtotal: itemTotal + parseInt(numericTax)});
  };

  //update item name entered by user
  checkItemName = value => {
    itemNameEmpty = false;
    this.setState({itemName: value})
  }

  //update item price entered by user
  checkItemPrice = value => {
    itemPriceEmpty = false;
    const numericPrice = this.itemPriceField.getRawValue().toFixed(2);
    this.setState({itemPrice: numericPrice})
  }

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

  //function to handle when user clicks review button
  onSubmitBillSplit = () => {
    if(this.state.name == ''){
      nameEmpty = true;
    }
    if(this.state.tax == 0){
      taxEmpty = true;
    }
    if(this.state.selectedFriends.length == 0){
      noFriends = 'Add Some Friends!';
    }
    if(this.state.selectedFriends.length > 0){
      noFriends = '';
    }
    if(this.state.items.length == 0){
      noItems = 'Add Some Items!';
    }
    if(this.state.items.length > 0){
      noItems = '';
    }

    this.forceUpdate();

    if(taxEmpty == false && nameEmpty == false && noFriends == '' && noItems == ''){
      console.log("first tax: " + this.state.tax);
      console.log("first tip: " + this.state.tip);
      console.log('submitting selected friends: ', this.state.selectedFriends)
      this.props.navigation.navigate('SplitByItemAssociate', {
                                                            name: this.state.name,
                                                            tip: this.state.tip,
                                                            tax: this.state.tax,
                                                            selectedFriends: this.state.selectedFriends,
                                                            items: this.state.items
                                                          })
    }
  }

  render() {
    const { disable, selectedFriends, selectedFlat, items } = this.state;
    var x;
    for (x in this.state.friends) {
      var name1 = this.state.friends[x].firstName + " " + this.state.friends[x].lastName
      tempArray[x] = { id: x, name: name1 };
    }
    // console.log('temp array: ', tempArray)
    var y;
    for (y in selectedFriends) {
      var name = selectedFriends[y].firstName + " " + selectedFriends[y].lastName
      this.state.selectedFlat[y] = { id: y, name: name };
    }
    var z;
    for (z in items) {
      tempItemArray[z] = { id: z, name: items[z].name, price: items[z].price };
    }

    var quan = [
                {value: '1'},
                {value: '2'},
                {value: '3'},
                {value: '4'},
                {value: '5'},
                {value: '6'},
                {value: '7'},
                {value: '8',}
              ]
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../assets/group-dinner.jpg')} style={styles.imageContainer}>
        <View style={styles.overlay} />
        <KeyboardAwareScrollView keyboardShouldPersistTaps='always' extraScrollHeight={130}>
          <View style={styles.infoContainer}>

          <View style={styles.receiptScannerContainer}>
            <ButtonComponent
              text='RECEIPT SCANNER'
              onPress={() => this.props.navigation.navigate('ReceiptScanner')}
              disabled={false}
              primary={true}
            />
          </View>
            <View style= {{alignContent:'flex-start'}}>
              <Text style={styles.inputTitle}>Bill Split Name</Text>
            </View>
            <TextInputComponent
              empty = {nameEmpty}
              placeholder="'Sunday Brunch'"
              onChangeText={(name) => this.updateName(name)}
              returnKeyType='next'
            />

          <Text style={styles.inputTitle}>Items:</Text>

          <View style={{height: this.state.items.length*50}}>
            <FlatList
              data={tempItemArray}
              extraData={this.state}
              renderItem={({item}) =>
                <View style={styles.searchboxContainer}>
                <Text style={{marginLeft: 25,marginTop: 9,color: '#35b0d2', fontWeight: 'bold',fontSize: 15, textAlign: 'center'}}>{item.name}</Text>
                <Text style={{marginTop: 10,color: '#35b0d2',fontSize: 13, textAlign: 'center'}}>${(item.price).toFixed(2)}</Text>
                <CheckBox
                  right={true}
                  title='Remove'
                  iconRight
                  iconType='material'
                  containerStyle={{
                                    backgroundColor: 'transparent',
                                    paddingTop: 7,
                                    height: 40,
                                    margin: 0,
                                    borderColor: 'transparent'}}
                  textStyle={{color: '#35b0d2', fontWeight: 'normal', fontSize: 12}}
                  uncheckedIcon='clear'
                  size= {22}
                  uncheckedColor='red'
                  checked={false}
                  onIconPress={() => this.removeItem(eval(JSON.stringify(item.id)))}
                />

                </View>
              }
              keyExtractor={item => item.id}
            />
          </View>

          <View style={styles.itemContainer}>
            <View style={{width: width/3, marginRight: 5}}>
              <TextInputComponent
                empty = {itemNameEmpty}
                placeholder="Item Name"
                onChangeText= {(value) => this.checkItemName(value)}
                returnKeyType='next'
                defaultValue={this.state.itemName}
              />
            </View>

            <View style={{width: width/4, marginRight: 5}}>
              <TextInputMask
                type={'money'}
                options={{
                  precision: 2,
                  separator: '.',
                  delimiter: ',',
                  unit: '$',
                  suffixUnit: ''
                }}
                value={this.state.itemPrice}
                onChangeText={(total) => this.checkItemPrice(total)}
                style={[styles.input,{
                  borderColor: itemPriceEmpty == true
                    ? 'red'
                    : '#35b0d2',
                }]}
                ref={(ref) => this.itemPriceField = ref}
                placeholder="Price"
                placeholderTextColor="rgba(255,255,255,0.8)"
                keyboardType={'numeric'}
                returnKeyType='go'
              />
            </View>

            <View style={{backgroundColor: 'rgba(255,255,255,0.2)', borderColor: '#35b0d2', borderWidth: 2, borderRadius: 20, width: width/7, justifyContent: 'center', alignContent: 'center'}}>
              <Dropdown
                data={quan}
                containerStyle= {{marginLeft: width/30, width: width/10 , height: 40}}
                pickerStyle= {{ backgroundColor: '#35b0d2'}}
                textColor= 'white'
                value = {this.state.quantity}
                dropdownOffset= {{top: 7, left: 0}}
                fontSize = {15}
                onChangeText = {(value) => this.setState({quantity: parseInt(value)})}
              />
            </View>
              <CheckBox
                center
                containerStyle={{padding: 0,height: 40,}}
                iconType='material'
                size= {30}
                uncheckedIcon='add-circle'
                uncheckedColor='rgba(255,255,255,0.6)'
                checked={false}
                onIconPress={() => this.addItem()}
              />


          </View>

          <Text style={styles.errorMessage}>{noItems}</Text>

          <Text style={styles.inputTitle}>Tax:</Text>

          <TextInputMask
            type={'money'}
            options={{
              precision: 2,
              separator: '.',
              delimiter: ',',
              unit: '$',
              suffixUnit: ''
            }}
            value={this.state.tax}
            onChangeText={(total) => this.checkTax(total)}
            style={[styles.input,{
              borderColor: taxEmpty == true
                ? 'red'
                : '#35b0d2',
            }]}
            ref={(ref) => this.taxField = ref}
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
                <Text style={styles.tipText}>(${(this.state.subtotal * 0.10).toFixed(2)})</Text>
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
                <Text style={styles.tipText}>(${(this.state.subtotal * 0.18).toFixed(2)})</Text>
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
                <Text style={styles.tipText}>(${(this.state.subtotal * 0.15).toFixed(2)})</Text>
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
                <Text style={styles.tipText}>(${(this.state.subtotal * 0.20).toFixed(2)})</Text>
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
                                      paddingTop: 7,
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
                // onTextChange={(value) => this.searchFriends(value)}
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
                items={tempArray}
                placeholder="Add friends!"
                placeholderTextColor="rgba(255,255,255,0.8)"
                autoCorrect= {false}
                resetValue={false}
                underlineColorAndroid="transparent"
              />

            <Text style={styles.errorMessage}>{noFriends}</Text>
            <ButtonComponent
              text='NEXT'
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
  receiptScannerContainer: {
    width: width/2,
    justifyContent: 'flex-end'
  },
  itemContainer: {
    flexDirection: 'row',
    height: 40,
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
