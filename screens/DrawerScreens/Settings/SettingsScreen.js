import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import {Header,Left,Icon} from 'native-base'

export default class SettingsScreen extends React.Component {

  render() {
    return (

      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../assets/blue.jpg')} style={styles.imageContainer}>
          <View style={styles.overlay} />

      <View style={styles.container}>

      <Header style={{borderBottomWidth:0,backgroundColor:'transparent', zIndex:100, top: 0, left:0, right:0}}>
          <Left>
            <Icon name="bars" type="FontAwesome" style={{color:'white' }} onPress={()=>this.props.navigation.openDrawer()}/>
          </Left>
        </Header>

        <View style={{flex:1}}>
          <ScrollView>

            <Text style={styles.heading}> PREFERENCES </Text>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('UserProfile')}>
              <Text>
                <Text style={styles.btntext}>EDIT PROFILE </Text>
                <Icon name="angle-right" type="FontAwesome" style={styles.icon}/>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('PaymentMethods')}>
              <Text>
                <Text style={styles.btntext}>PAYMENT METHODS </Text>
                <Icon name="angle-right" type="FontAwesome" style={styles.icon}/>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('NotificationSettings')}>
              <Text>
                <Text style={styles.btntext}>NOTIFICATIONS </Text>
                <Icon name="angle-right" type="FontAwesome" style={styles.icon}/>
              </Text>
            </TouchableOpacity>


            <Text style={styles.heading}> SECURITY </Text>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ChangePassword')}>
              <Text>
                <Text style={styles.btntext}>CHANGE PASSWORD </Text>
                <Icon name="angle-right" type="FontAwesome" style={styles.icon}/>
              </Text>
            </TouchableOpacity>


            <Text style={styles.heading}> INFORMATION </Text>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('UserManual')}>
              <Text>
                <Text style={styles.btntext}>USER MANUAL </Text>
                <Icon name="angle-right" type="FontAwesome" style={styles.icon}/>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('DeveloperGuide')}>
              <Text>
                <Text style={styles.btntext}>DEVELOPER GUIDE </Text>
                <Icon name="angle-right" type="FontAwesome" style={styles.icon}/>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('FAQs')}>
              <Text>
                <Text style={styles.btntext}>FAQS </Text>
                <Icon name="angle-right" type="FontAwesome" style={styles.icon}/>
              </Text>
            </TouchableOpacity>


            <Text style={styles.heading}> CONTACT </Text>
            <Text style={styles.hyperlink} onPress={() => Linking.openURL('mailto:ChargeMeHelp@gmail.com')}>
                ChargeMeHelp@gmail.com
            </Text>

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
  heading:{
    fontSize:22,
    fontWeight: 'bold',
    color: "white",
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  textinput: {
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 40,
    marginBottom: 30,
    color: "#000",
  },
  button: {
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
  },
  btntext:{
    fontSize: 20,
    color: 'white',
  },
  icon:{
    fontSize:28,
    color: 'white',
  },
  hyperlink:{
    color: '#34c6de',
    fontSize: 20,
    textAlign:'left',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(69,85,117,0.7)',
  },
  imageContainer: {
      resizeMode:'cover',
      flex:1,
  }
});
