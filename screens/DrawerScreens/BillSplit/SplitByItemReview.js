import React from 'react';
import * as firebase from "firebase";
import ButtonComponent from '../../../components/ButtonComponent'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AwesomeAlert from 'react-native-awesome-alerts';
import moment from 'moment';
import { StackActions } from 'react-navigation';
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
  FlatList,
  SectionList
} from 'react-native';
import {
  ListItem,
  Icon,
  CheckBox
} from 'react-native-elements';
import DatePicker from 'react-native-datepicker'


//get dimensions of screen
const{width, } = Dimensions.get('window')
//set bools for showing alerts
let showOptionAlert = false;
let showLoadingAlert = false;
let showConfirmedAlert = false;
let pickDate = ''
let name  = ''
let tax  = 0
let tip = 0
let finalshared = 0
let friends = []
let friendI = []
let payEach = 0
let itemTotal = []
let total = 0

export default class SplitEvenlyReview extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      date: '',
    };

  }

  componentDidMount(){

    const { navigation } = this.props;

    name = navigation.getParam('name');
    tax = parseFloat(navigation.getParam('tax'))
    tip = parseFloat(navigation.getParam('tip'))
    total = parseFloat(navigation.getParam('itemTotal'))
    friends = navigation.getParam('friends');

    friendI= []
    friendI.push(...navigation.getParam('friendItems'))

    var a;
    var b;
    for (a in friendI){
      //console.log('a: ', a)
      //console.log('friendI[a]: ', friendI[a])
      var itemTotal = 0
      for( b in friendI[a].data){
        //console.log('b: ', b)

        itemTotal += friendI[a].data[b].price
      }
      var tipEach = itemTotal * (tip / 100)
      var taxEach = (itemTotal / total) * tax
      friendI[a] = ({title: friendI[a].title, data: friendI[a].data, total: itemTotal + tipEach + taxEach})
      friendI[a].data.push({key: friendI[a].data.length, name: "tip & tax", price: tipEach + taxEach, section: a})
    }

    showOptionAlert = false;
    showLoadingAlert = false;
    showConfirmedAlert = false;
    pickDate = ''

    this.forceUpdate();
  }

  //if component unmounts by user pressing back button, remove the tip and tax item we created
  componentWillUnmount(){
    var x
    for(x in friendI){
      friendI[x].data.splice(friendI[x].data.length - 1, 1)
    }
  }

  //function to show option alert
  showOptionAlert =() => {
    if(this.state.date == ''){
      pickDate = 'Please select a date'
    }
    if(this.state.date != ''){
      showOptionAlert = true;
    }
    this.forceUpdate();
  }
  //function to show loading alert
  showLoadingAlert =() => {
    showLoadingAlert = true;
    this.forceUpdate();
  }
  //function to show confirmed alert
  showConfirmedAlert =() => {
    showConfirmedAlert = true;
    this.forceUpdate();
  }

  //function to hide option alert
  hideOptionAlert = () => {
      showOptionAlert= false;
      this.forceUpdate();
  }
  //function to hide loading alert
  hideLoadingAlert = () => {
      showLoadingAlert= false;
      this.forceUpdate();
  }
  //function to hide confirmed alert
  hideConfirmedAlert = () => {
      showConfirmedAlert= false;
      this.forceUpdate();
  }

  changeDate = (date) => {
    this.setState({date: date});
    pickDate = '';
    this.forceUpdate();
  }


  //navigation that takes place after bill split is submitted
  navigating(){
    //reset screen stack of billSplit stack
    this.props.navigation.dispatch(StackActions.popToTop());
    //navigate to dashboard
    this.props.navigation.navigate('Dashboard');
  }

  //function to handle when user clicks confirm button on option alert
  onSubmitBillSplit(){

    //call correct sequence of alerts
    this.hideOptionAlert()
    this.showLoadingAlert()

    friendI.splice(0,1)

    //get current user's uid
    var uid = firebase.auth().currentUser.uid

    for (let i = 0; i < friends.length; i++){
      const unique = moment()

      //dispatch charge to database under user
      firebase
        .database()
        .ref("currentTransactions/" + uid + "/" + unique )
        .set({
              charging: uid,
              paying: friends[i].key,
              amount: parseFloat((friendI[i].total).toFixed(2)),
              name: name,
              date: this.state.date,
        });

        //dispatch charge to database under friend
        firebase
          .database()
          .ref("currentTransactions/" + friends[i].key + "/" + unique)
          .set({
                charging: uid,
                paying: friends[i].key,
                amount: parseFloat((friendI[i].total).toFixed(2)),
                name: name,
                date: this.state.date,
          });
      }


    this.hideLoadingAlert()
    this.showConfirmedAlert()

    //delay one second to allow user to see confirmation alert before navigating
    var delayInMilliseconds = 1000; //1 second
    setTimeout(() => {this.navigating();}, delayInMilliseconds);

  }

  renderCustomAlertView = () => (
    <View style={styles.customView}>
      <Icon
        name='check-circle'
        color= 'green'
        size= {60}
        onChangeText={text => this.setState({ text })}
      />
    </View>
  );

  render(){

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
              <Icon name = 'check' color='white' size = {24}/>
            </TouchableOpacity>

            <View style={[styles.line, {backgroundColor: 'rgba(225,225,225,0.2)'}]}/>

            <TouchableOpacity style = {styles.progressButton}
              disabled = {true}
              >
              <Icon name = 'check' color='white' size = {24}/>
            </TouchableOpacity>

            <View style={styles.line}/>

            <TouchableOpacity style = {styles.progressButton}
              disabled = {true}
              >
              <Text style={styles.stepLabel}>4</Text>
            </TouchableOpacity>
          </View>

          <View style = {{flexDirection: 'row', alignItems: 'center',marginLeft: width/10,width: width/1.2,}}>
            <Text style={{marginLeft: width/30, marginRight: width/11, color: 'rgba(225,225,225,0.2)', fontSize: 15}}>Info</Text>
            <Text style={{marginRight: width/16, color: 'rgba(225,225,225,0.2)', fontSize: 15}}>Assign</Text>
            <Text style={{marginRight: width/15, color: 'rgba(225,225,225,0.2)', fontSize: 15}}>Tip/Tax</Text>
            <Text style={{color: 'white', fontSize: 15}}>Review</Text>
          </View>

        </View>




          <KeyboardAwareScrollView keyboardShouldPersistTaps='always'contentContainerStyle={styles.contentContainer}>
            <Text style={styles.pageTitle}>{name}</Text>
            <View style={styles.borderContainer}>
              <View style={styles.infoContainer}>


                <DatePicker
                    style={{width: width/2.4, marginBottom:10}}
                    showIcon = {true }
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="MM-DD-YYYY"
                    maxDate= {moment().format("MM-DD-YYYY")}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        backgroundColor: "white",
                        marginLeft: 45,
                        borderColor: 'rgba(255,255,255,1)',
                        borderWidth: 2,
                        borderRadius: 5,
                      },
                      dateText: {
                        color: 'rgba(1,1,1,0.6)',
                        fontWeight: 'bold'
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.changeDate(date)}}
                  />
                  <Text style={styles.errorMessage}>{pickDate}</Text>


                <Text style={styles.sectionTitle}>Who's Paying What:</Text>

                <SectionList
                  ItemSeparatorComponent={this.FlatListItemSeparator}
                  sections={friendI}
                  renderSectionHeader={({ section }) => (
                    <View style={[styles.SectionHeaderStyle, {backgroundColor: section.title == 'Me'? 'coral' : '#35b0d2' , borderColor: section.title == 'Me'? 'coral' : '#35b0d2' }]}>
                      <Text style={{color: 'white', fontWeight: 'bold'}} > {section.title} </Text>
                      <Text style={{color: 'white', fontWeight: 'bold'}} > ${section.total.toFixed(2)} </Text>
                    </View>
                  )}
                  renderItem={({ item }) => (
                    // Single Comes here which will be repeatative for the FlatListItems
                    <View style= {styles.SectionListItemStyle}>
                      <Text style={{color: 'rgba(0,0,0,0.6)', fontWeight: 'bold', marginTop: 7}}>{item.name} </Text>
                      <Text style={{color: 'rgba(0,0,0,0.6)', marginTop: 7, marginRight: 10}}> ${(item.price).toFixed(2)}</Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => index}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <ButtonComponent
                text='SUBMIT BILL SPLIT'
                onPress={() => this.showOptionAlert()}
                disabled={false}
                primary={true}
              />
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
          <AwesomeAlert
              show={showOptionAlert}
              showProgress={false}
              title="Charge Friends? "
              titleStyle={{textAlign: 'center'}}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              cancelButtonStyle={{width: width/7, alignItems: 'center'}}
              showConfirmButton={true}
              confirmButtonStyle={{width: width/7, alignItems: 'center'}}
              cancelText="NO"
              cancelButtonTextStyle= {{fontWeight: 'bold'}}
              confirmText="YES"
              confirmButtonTextStyle= {{fontWeight: 'bold'}}
              confirmButtonColor='#35b0d2'
              onCancelPressed={() => {
                this.hideOptionAlert();
              }}
              onConfirmPressed={() => {
                this.onSubmitBillSplit();
              }}
            />
            <AwesomeAlert
                show={showLoadingAlert}
                showProgress={true}
                title="Submitting... "
                titleStyle={{textAlign: 'center'}}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={false}
              />
              <AwesomeAlert
                  show={showConfirmedAlert}
                  customView={this.renderCustomAlertView()}
                  closeOnTouchOutside={false}
                  closeOnHardwareBackPress={false}
                />
      </SafeAreaView>

    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
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
    paddingBottom: 20,
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
    height: 30,
    borderColor: 'rgba(255,255,255,1)',
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 2,
    borderRadius: 5,
    width: width/7,
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
    marginTop: 20,
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
  SectionHeaderStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#35b0d2',
    borderColor: '#35b0d2',
    borderWidth: 2,
    borderRadius: 5,
    height: 40,
    fontSize: 15,
    padding: 8,
    //marginBottom: 5,
  },
  SectionListItemStyle: {
    borderColor: 'transparent',
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    //marginLeft: width/18,
    marginBottom: 5,
    width: width/1.6,
    fontSize: 15,
    paddingLeft: 17,
    height: 34,
    color: '#35b0d2',
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
  },
  errorMessage:{
    color: 'red',
    marginBottom: 5
  },
});
