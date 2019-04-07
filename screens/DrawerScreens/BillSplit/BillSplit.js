import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  TextInput,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import {Header,Left,Icon} from 'native-base'
import ButtonComponent from '../../../components/ButtonComponent'

const{width} = Dimensions.get('window')

export default class BillSplit extends React.Component {


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../assets/group-dinner.jpg')} style={styles.imageContainer}>
        <View style={styles.overlay} />
        <Header>
          <Left>
            <Icon name="bars" type="FontAwesome" onPress={()=>this.props.navigation.openDrawer()}/>
          </Left>
        </Header>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Choose your Bill Split</Text>
          </View>

          <View style={styles.container}>
            <Text/>
          </View>

          <View style={styles.infoContainer}>

            <View style={styles.topContainer}>
              <ButtonComponent
                text='SPLIT EVENLY'
                onPress={() => this.props.navigation.navigate('SplitEvenly')}
                disabled={false}
                primary={true}
              />
            </View>

            <View style={styles.bottomContainer}>
              <ButtonComponent
                text='SPLIT BY ITEM'
                onPress={() => this.props.navigation.navigate('SplitByItem')}
                disabled={false}
                primary={true}
              />
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
    alignItems: 'center',
  },
  bottomContainer:{
    flex: 2.5,
  },
  topContainer:{
    flex: 1,
  },
  errorMessage:{
    color: 'red',
  },
  inputBoxContainer:{
    flex:8,
  },
  signUpContainer: {
    flex:1,
  },
  header:{
    position:'absolute',
  },
  imageContainer: {
      resizeMode:'cover',
      flex:1,
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(69,85,117,0.7)',
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
  },
  titleContainer:{
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
    flex: 1,
    width: width,
  },
  infoContainer: {
    flex: 2,
    width: width,
    padding:20,
    justifyContent:'flex-end',
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
  title:{
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 25,
    textAlign:'center',
  },
  inputTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },

});
