import React from 'react';
import * as firebase from "firebase";
import ButtonComponent from '../../../components/ButtonComponent'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AwesomeAlert from 'react-native-awesome-alerts';
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
  FlatList
} from 'react-native';
import {
  ListItem,
  Icon
} from 'react-native-elements';

//get dimensions of screen
const{width, } = Dimensions.get('window')
//set bools for showing alerts
let showOptionAlert = false;
let showLoadingAlert = false;
let showConfirmedAlert = false;

export default class SplitEvenlyReview extends React.Component{
  constructor(props){
    super(props);

    //make sure bools reset every time page is loaded
    showOptionAlert = false;
    showLoadingAlert = false;
    showConfirmedAlert = false;
  }

  //function to show option alert
  showOptionAlert =() => {
    showOptionAlert = true;
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
    const { navigation } = this.props;

    const name = navigation.getParam('name');
    const total = parseFloat(navigation.getParam('total'))
    const tip = parseFloat(navigation.getParam('tip'))
    const finalTotal = parseFloat((total + tip).toFixed(2))
    const selectedFriends = navigation.getParam('selectedFriends');
    const payEach = parseFloat((finalTotal/(selectedFriends.length + 1)).toFixed(2))
    // console.log('name: ', name)
    // console.log('total: ', total)
    // console.log('tip: ', tip)
    // console.log('final total', finalTotal)
    // console.log('selectedFriends', selectedFriends)
    // console.log('each pays: ', payEach)
    let selectedFlat = []
    var y;
    for (y in selectedFriends) {
      selectedFlat[y] = { id: y, name: selectedFriends[y] };
    }
    return(
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../assets/group-dinner.jpg')} style={styles.imageContainer}>
          <View style={styles.overlay} />

          <Text style={styles.pageTitle}>{name}</Text>

          <KeyboardAwareScrollView keyboardShouldPersistTaps='always'contentContainerStyle={styles.contentContainer}>
            <View style={styles.borderContainer}>
              <View style={styles.infoContainer}>
                <Text style={styles.sectionTitle}>Subtotal: </Text>

                <View style={styles.valueContainer}>
                  <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>${total.toFixed(2)}</Text>
                </View>

                <Text style={styles.sectionTitle}>Tip Selected: </Text>
                <View style={styles.valueContainer}>
                  <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>${tip.toFixed(2)}</Text>
                </View>

                <Text style={styles.sectionTitle}>Final Total:</Text>
                <View style={styles.valueContainer}>
                  <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>${finalTotal.toFixed(2)}</Text>
                </View>
                <Text style={styles.sectionTitle}>Who's Paying What:</Text>

                <View style={[styles.searchboxContainer, {borderColor: 'coral'}] }>
                  <Text style={{marginLeft: 25,marginTop: 9,color: 'coral', fontWeight: 'bold',fontSize: 15, textAlign: 'center'}}>Me</Text>
                  <Text style={{marginRight: 25,marginTop: 9,color: 'coral', fontWeight: 'bold',fontSize: 15, textAlign: 'center'}}>${payEach.toFixed(2)}</Text>
                </View>

                <FlatList
                  data={selectedFlat}
                  extraData={this.state}
                  renderItem={({item}) =>
                    <View style={styles.searchboxContainer}>
                      <Text style={{marginLeft: 25,marginTop: 9,color: '#35b0d2', fontWeight: 'bold',fontSize: 15, textAlign: 'center'}}>{item.name}</Text>
                      <Text style={{marginRight: 25,marginTop: 9,color: '#35b0d2', fontWeight: 'bold',fontSize: 15, textAlign: 'center'}}>${payEach.toFixed(2)}</Text>
                    </View>
                  }
                  keyExtractor={item => item.id}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <ButtonComponent
                text='SUBMIT'
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
});
