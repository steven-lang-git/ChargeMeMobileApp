import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  SafeAreaView,
  ImageBackground,
  Dimensions
} from 'react-native';
import {Icon} from 'native-base'
import * as firebase from 'firebase';

const{width} = Dimensions.get('window')

export default class PaymentMethods extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      balance: 0
    };
  }

  componentDidMount(){

    //get user's firebase id
    var uid = firebase.auth().currentUser.uid;

    //get user's balance
    firebase
    .database()
    .ref("payments/" + uid + '/wallet')
    .once("value", snapshot => {
      this.setState({
        balance: (snapshot.val().balance).toFixed(2)
      })
    });
  }

  render() {

    const { balance } = this.state
    return (

      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../../assets/blue.jpg')} style={styles.imageContainer}>
          <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={{flex:1}}>
          <ScrollView>

          <Text style={styles.text}>
            ChargeMe Balance: ${balance}
          </Text>

          <View style={styles.line}/>


            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Bank')}>
                <Text style={styles.btntext}>ADD BANK </Text>
                <Icon name="angle-right" type="FontAwesome" style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('DebitCard')}>
                <Text style={styles.btntext}>ADD DEBIT CARD </Text>
                <Icon name="angle-right" type="FontAwesome" style={styles.icon}/>
            </TouchableOpacity>

          </ScrollView>
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
  text: {
    fontSize: width/18.75,
    alignSelf: 'stretch',
    padding: width/18.75,
    width: '100%',
    alignSelf: 'center',
    marginTop: width/18.75,
    color: 'white',
  },
  button: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: width/18.75,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: '100%',
    marginTop: width/37.5,
  },
  btntext:{
    fontSize: width/18.75,
    color: '#fff',
  },
  icon:{
    fontSize:width/13.39,
    color: 'white',
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(69,85,117,0.7)',
  },
  line:{
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: 1,
    width: width
  },
  imageContainer: {
      resizeMode:'cover',
      flex:1,
  }
});
