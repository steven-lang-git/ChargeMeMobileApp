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
  Picker,
  SectionList
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ButtonComponent from '../../../components/ButtonComponent'
import {
  ListItem,
  CheckBox,
} from 'react-native-elements';

//get dimensions of screen
const{width, } = Dimensions.get('window')

let tempItemArray = [];
let count = 0;
let friendItems = [{title: 'Me', data: []}];
let looseItems = ''
let emptyFriend = ''

export default class SplitByItemAssociate extends React.Component{
  constructor(props){
    super(props);

    const { navigation } = this.props;

    this.state = {
       name: navigation.getParam('name'),
       friends: navigation.getParam('selectedFriends'),
       unassocItems: navigation.getParam('items'),
       tip: parseFloat(navigation.getParam('tip')),
       tax: parseFloat(navigation.getParam('tax')),
    };

    count = 0;
    looseItems = ''
    emptyFriend = ''
    tempItemArray = [];
    friendItems = [{title: 'Me', data: []}];
    var y
    for (y in this.state.friends){
      var name = this.state.friends[y].firstName + " " + this.state.friends[y].lastName
      friendItems.push({title: name, data: []})
    }
    console.log(friendItems)
  }

  associate = (value, index, selected) =>{
    emptyFriend = ''
    looseItems = ''
    console.log('friend name: ',value)
    console.log('friend index: ', index)
    console.log('item index: ', selected)


    const{ unassocItems } = this.state;

    friendItems[index].data.push({name: unassocItems[selected].name, price: unassocItems[selected].price, section: index, key: (friendItems[index].data).length })
    console.log('friends items: ', friendItems)

    unassocItems.splice(selected,1);
    console.log('unassoc items: ', unassocItems)
    this.setState({unassocItems: unassocItems})
  }

  unassociate = (item) =>{

    const{ unassocItems } = this.state;

    emptyFriend = ''
    looseItems = ''
    console.log('UNASSOCIATING')
    console.log('unassociate value: ', item)
    console.log('key: ', item.key)
    console.log('friends items: ', friendItems)

    unassocItems.push({name: item.name, price: item.price})

    console.log('unassoc items: ', unassocItems)

    friendItems[item.section].data.splice(friendItems[item.section].data.map((el) => el.key).indexOf(item.key),1)

    console.log('friendItems: ', friendItems )
    this.setState({unassocItems: unassocItems})

    this.forceUpdate();

  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 0.5, width: width, backgroundColor: '#C8C8C8'}}/>
    );
  };

  //function to handle when user clicks review button
  onSubmitBillSplit = () => {
    if(this.state.unassocItems.length != 0){
      looseItems = 'Assign Items!';
    }

    var y
    for (y in friendItems){
      if(friendItems[y].data.length == 0){
        emptyFriend = 'Assign each friend at least one item!'
      }
    }

    this.forceUpdate();

    if(looseItems == '' && emptyFriend == ''){

      this.props.navigation.navigate('SplitByItemReview', {
                                                            name: this.state.name,
                                                            tip: this.state.tip,
                                                            tax: this.state.tax,
                                                            friends: this.state.friends,
                                                            friendItems: friendItems,
                                                          })
    }
  }

  //  const payEach = parseFloat(((tip + tax)/(selectedFriends.length + 1)).toFixed(2))
  //  const today = moment().format("MMM Do YY");

  render(){
    const { friends, unassocItems } = this.state;
    var z;
    for (z in unassocItems) {
      tempItemArray[z] = { id: z, name: unassocItems[z].name, price: unassocItems[z].price };
    }

    var friendSimple = [{value: 'Me'}]
    var x;
    for (x in friends){
      var name = friends[x].firstName + " " + friends[x].lastName
      friendSimple.push({value: name})
    }

    return(
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../assets/group-dinner.jpg')} style={styles.imageContainer}>
          <View style={styles.overlay} />

          <KeyboardAwareScrollView keyboardShouldPersistTaps='always'contentContainerStyle={styles.contentContainer}>

          <Text style={styles.inputTitle}>Unassociated Items:</Text>

          <View style={{marginLeft: 20, marginRight: 20, height: this.state.unassocItems.length*52}}>
            <FlatList
              data={tempItemArray}
              extraData={this.state}
              renderItem={({item}) =>
                <View style={styles.searchboxContainer}>
                  <Text style={{marginLeft: 25,marginTop: 9,color: 'rgba(0,0,0,0.8)', fontWeight: 'bold',fontSize: 15, textAlign: 'center'}}>{item.name}</Text>
                  <Text style={{marginTop: 10,color: 'rgba(0,0,0,0.8)',fontSize: 13, textAlign: 'center'}}>${(item.price).toFixed(2)}</Text>
                  <View style={{flexDirection: 'row', width: width/3, }}>
                    <Text style={{marginTop: 10,color: 'rgba(0,0,0,0.8)',fontSize: 13}}>Assign</Text>
                    <Dropdown
                      data={friendSimple}
                      containerStyle= {{width: width/20 , height: 40}}
                      pickerStyle= {{ backgroundColor: 'white', width: width/2.5}}
                      textColor= '#35b0d2'
                      baseColor= '#35b0d2'
                      itemColor = '#35b0d2'
                      dropdownOffset= {{top: 7, left: -width/3.5}}
                      fontSize = {15}
                      onChangeText = {(value, index, selected) => this.associate(value, index, eval(JSON.stringify(item.id)))}
                    />
                  </View>

                </View>
              }
              keyExtractor={item => item.id}
            />
            <Text style={styles.errorMessage}>{looseItems}</Text>
          </View>

          <Text style={styles.inputTitle}>Who's Paying What:</Text>

          <View style={{marginLeft: 20, marginRight: 20 }}>
            <SectionList
              ItemSeparatorComponent={this.FlatListItemSeparator}
              sections={friendItems}
              renderSectionHeader={({ section }) => (
                <View style={[styles.SectionHeaderStyle, {backgroundColor: section.title == 'Me'? 'coral' : '#35b0d2' , borderColor: section.title == 'Me'? 'coral' : '#35b0d2' }]}>
                  <Text style={{color: 'white', fontWeight: 'bold'}} > {section.title} </Text>
                </View>
              )}
              renderItem={({ item }) => (
                // Single Comes here which will be repeatative for the FlatListItems
                <View style= {styles.SectionListItemStyle}>
                  <Text style={{color: 'rgba(0,0,0,0.8)', fontWeight: 'bold', marginTop: 7}}>{item.name} </Text>
                  <Text style={{color: 'rgba(0,0,0,0.8)', marginTop: 7}}> ${(item.price).toFixed(2)}</Text>

                  <CheckBox
                    right={true}
                    title='Remove'
                    iconRight
                    iconType='material'
                    containerStyle={{
                                      backgroundColor: 'transparent',
                                      paddingTop: 4,
                                      paddingBottom: 0,
                                      height: 30,
                                      margin: 0,
                                      borderColor: 'transparent'}}
                    textStyle={{ color: 'rgba(0,0,0,0.6)', fontWeight: 'normal', fontSize: 12}}
                    uncheckedIcon='clear'
                    size= {20}
                    uncheckedColor='coral'
                    checked={false}
                    onIconPress={this.unassociate.bind(this, item)}
                  />
                </View>
              )}
              keyExtractor={(item, index) => index}
            />
            <Text style={styles.errorMessage}>{emptyFriend}</Text>
            <View style={{marginTop: 40}}>
              <ButtonComponent
                text='REVIEW BILL SPLIT'
                onPress={() => this.onSubmitBillSplit()}
                disabled={false}
                primary={true}
              />
            </View>
          </View>



          </KeyboardAwareScrollView>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  errorMessage:{
    color: 'red',
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
    flex: 1,
    padding: 20
  },
  borderContainer: {
    borderColor: '#35b0d2',
    borderWidth: 2,
    margin: 20,
  },
  contentContainer: {
    width: width,
  },
  searchboxContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    height: 40,
    borderColor: '#35b0d2',
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 10,
  },
  valueContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    height: 40,
    borderColor: '#35b0d2',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    width: width/2.5,
  },
  buttonContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  pageTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
  },
  sectionTitle: {
    textAlign: 'left',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,

  },
  customView: {
    height: width/3,
    width: width/3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
    marginLeft: 10,
    textAlign: 'left',
  },
  SectionHeaderStyle: {
    backgroundColor:'#35b0d2',
    borderColor: '#35b0d2',
    borderWidth: 2,
    borderRadius: 5,
    height: 40,
    fontSize: 15,
    padding: 8,
    marginTop: 5,
  },
  SectionListItemStyle: {
    borderColor: 'transparent',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    //marginLeft: width/18,
    marginBottom: 5,
    width: width/1.4,
    fontSize: 15,
    paddingLeft: 17,
    height: 34,
  },
});
