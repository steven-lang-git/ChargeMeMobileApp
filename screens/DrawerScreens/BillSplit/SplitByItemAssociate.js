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
  Icon
} from 'react-native-elements';

//get dimensions of screen
const{width, } = Dimensions.get('window')

let tempItemArray = [];
let unassocItems =[];
let items = [];
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
    };
  }

  componentDidMount(){
    const { navigation } = this.props;

    console.log('items in associate screen: ', navigation.getParam('items'))
    unassocItems= []
    unassocItems.push(...navigation.getParam('items'));
    items.push(...unassocItems);
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

    this.generateTempItemArray()

    this.forceUpdate();
    console.log(friendItems)
  }

  generateTempItemArray = () => {
    tempItemArray = []
    var z;
    for (z in unassocItems) {
      tempItemArray[z] = { id: z, name: unassocItems[z].name, price: unassocItems[z].price };
    }
    console.log('temp item array: ', tempItemArray)

    this.forceUpdate();
  }

  associate = (value, index, selected) =>{
    emptyFriend = ''
    looseItems = ''
    console.log('friend name: ',value)
    console.log('friend index: ', index)
    console.log('item index: ', selected)

    friendItems[index].data.push({name: unassocItems[selected].name, price: unassocItems[selected].price, section: index, key: (friendItems[index].data).length })
    console.log('friends items: ', friendItems)

    unassocItems.splice(selected,1);
    this.generateTempItemArray()
  }

  unassociate = (item) =>{

    emptyFriend = ''
    looseItems = ''
    console.log('UNASSOCIATING')
    console.log('unassociate value: ', item)
    console.log('key: ', item.key)
    console.log('friends items: ', friendItems)

    unassocItems.push({name: item.name, price: item.price})
    this.generateTempItemArray()
    friendItems[item.section].data.splice(friendItems[item.section].data.map((el) => el.key).indexOf(item.key),1)

    console.log('friendItems: ', friendItems )

    this.forceUpdate();

  }


  //function to handle when user clicks review button
  onSubmitBillSplit = () => {
    if(unassocItems.length != 0){
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

      const { navigation } = this.props;

      console.log('associate items: ', navigation.getParam('items'))

      this.props.navigation.navigate('SplitByItemPricing', {
                                                            name: this.state.name,
                                                            friends: this.state.friends,
                                                            friendItems: friendItems,
                                                            items: items,
                                                          })
    }
  }

  //  const payEach = parseFloat(((tip + tax)/(selectedFriends.length + 1)).toFixed(2))
  //  const today = moment().format("MMM Do YY");

  render(){
    const { friends } = this.state;


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

          <View style={{ width: width, padding:20, paddingBottom: 0}}>

          <View style = {{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', marginLeft: (width-(width/1.5))/2 - 20,width: width/1.5,}}>

            <TouchableOpacity style = {styles.progressButton}
              disabled = {true}
              >
              <Icon name = 'check' color='white' size = {24}/>
            </TouchableOpacity>

            <View style={styles.line}/>

            <TouchableOpacity style = {styles.progressButton}
              disabled = {true}
              >
              <Text style={styles.stepLabel}>2</Text>
            </TouchableOpacity>

            <View style={[styles.line, {backgroundColor: 'rgba(225,225,225,0.2)'}]}/>

            <TouchableOpacity style = {[styles.progressButton, {backgroundColor: 'rgba(225,225,225,0.2)'}]}
              disabled = {true}
              >
              <Text style={[styles.stepLabel, {color: 'rgba(225,225,225,0.2)'}]}>3</Text>
            </TouchableOpacity>

            <View style={[styles.line, {backgroundColor: 'rgba(225,225,225,0.2)'}]}/>

            <TouchableOpacity style = {[styles.progressButton, {backgroundColor: 'rgba(225,225,225,0.2)'}]}
              disabled = {true}
              >
              <Text style={[styles.stepLabel, {color: 'rgba(225,225,225,0.2)'}]}>4</Text>
            </TouchableOpacity>
          </View>

          <View style = {{flexDirection: 'row', alignItems: 'center',marginLeft: width/10,width: width/1.2,}}>
            <Text style={{marginLeft: width/30, marginRight: width/11, color: 'rgba(225,225,225,0.2)', fontSize: 15}}>Info</Text>
            <Text style={{marginRight: width/15, color: 'white', fontSize: 15}}>Assign</Text>
            <Text style={{marginRight: width/15, color: 'rgba(225,225,225,0.2)', fontSize: 15}}>Shared</Text>
            <Text style={{color: 'rgba(225,225,225,0.2)', fontSize: 15}}>Review</Text>
          </View>
          </View>

          <KeyboardAwareScrollView keyboardShouldPersistTaps='always'contentContainerStyle={styles.contentContainer}>
          <View style={{ width: width, padding:20, paddingBottom: 0}}>


          <Text style={[styles.inputTitle, {marginTop: 10}]}>Unassociated Items:</Text>


            <FlatList
              data={tempItemArray}
              extraData={unassocItems}
              renderItem={({item}) =>
                <View style={styles.searchboxContainer}>
                  <View>
                    <Text style={{marginTop: 9,color: 'rgba(0,0,0,0.6)', fontWeight: 'bold',fontSize: 15}}>{item.name}</Text>
                  </View>

                  <View style={{flexDirection: 'row' }}>
                    <Text style={{marginTop: 10, marginRight: 25, color: 'rgba(0,0,0,0.6)',fontSize: 13,}}>${(item.price).toFixed(2)}</Text>
                    <Text style={{marginTop: 10,color: 'rgba(0,0,0,0.6)',fontSize: 13}}>Assign</Text>
                    <Dropdown
                      data={friendSimple}
                      containerStyle= {{width: width/20 , height: 40, marginRight: 7}}
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


          <Text style={styles.inputTitle}>Who's Paying What:</Text>
          </View>

          <View style={{marginLeft: 20, marginRight: 20 }}>
            <SectionList
              sections={friendItems}
              renderSectionHeader={({ section }) => (
                <View style={[styles.SectionHeaderStyle, {backgroundColor: section.title == 'Me'? 'coral' : '#35b0d2' , borderColor: section.title == 'Me'? 'coral' : '#35b0d2' }]}>
                  <Text style={{color: 'white', fontWeight: 'bold'}} > {section.title} </Text>
                </View>
              )}
              renderItem={({ item }) => (
                <View style= {styles.SectionListItemStyle}>
                  <View>
                    <Text style={{color: 'rgba(0,0,0,0.6)', fontWeight: 'bold',marginTop: 7 }}>{item.name}</Text>
                  </View>

                  <View style={{ flexDirection: 'row',}}>
                    <Text style={{color: 'rgba(0,0,0,0.6)', marginTop: 7}}>${(item.price).toFixed(2)}</Text>
                    <CheckBox
                      right={true}
                      iconRight
                      iconType='material'
                      containerStyle={{
                                        paddingTop: 4,
                                        paddingBottom: 0,
                                        height: 30,
                                        margin: 0
                                      }}
                      uncheckedIcon='clear'
                      size= {20}
                      uncheckedColor='coral'
                      checked={false}
                      onIconPress={this.unassociate.bind(this, item)}
                    />
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index}
            />
            <Text style={styles.errorMessage}>{emptyFriend}</Text>


          <View style={{marginTop: 40}}>
            <ButtonComponent
              text='NEXT'
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
    paddingLeft: 25,
    justifyContent: 'space-between',
    height: 40,
    borderColor: 'transparent',
    backgroundColor: 'rgba(255,255,255, 1)',
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 5,
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
    borderColor:'transparent',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 5,
    width: width/1.5,
    fontSize: 15,
    paddingLeft: 17,
    height: 34,
  },
  progressButton: {
    margin: 0,
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#35b0d2',
  },
  line: {
    width: width/12 ,
    height: 3,
    backgroundColor: '#35b0d2'
  },
  stepLabel: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  }
});
