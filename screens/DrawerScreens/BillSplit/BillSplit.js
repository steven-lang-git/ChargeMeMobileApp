import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
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
        <ImageBackground
          source={require('../../../assets/group-dinner.jpg')}
          style={styles.imageContainer}
        >
        <View style={styles.overlay} />
        <Header style={{borderBottomWidth:0,backgroundColor:'transparent', zIndex:100, top: 0, left:0, right:0}}>
          <Left>
            <Icon name="bars" type="FontAwesome" style={{color:'white' }} onPress={()=>this.props.navigation.openDrawer()}/>
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
                text='SPLIT BY AMOUNT'
                onPress={() => this.props.navigation.navigate('SplitByAmount')}
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
  imageContainer: {
      resizeMode:'cover',
      flex:1,
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(69,85,117,0.7)',
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
  title:{
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 25,
    textAlign:'center',
  },

});
