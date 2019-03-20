import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ActivityIndicator, Alert,Image, ListView, FlatList,Dimensions } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'
import {Camera, Permissions} from 'expo';
const{width} = Dimensions.get('window')

export default class ReceiptScanner extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="camera" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photo: null,
    photoId:''
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  takePicture = async function() {this.camera.takePictureAsync({ skipProcessing: true }).then((data) => {
    this.setState({
        //takeImageText: "PICTURE TAKEN",
        photo: data.uri
    }, ()=>alert(data.uri))
  }
  )
}
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
          <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>           
           
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                {/* <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text> */}
                <Image style={{width:70, height: 70,marginBottom:10}} source={require('../assets/flip.png')} />
                
               
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                  
                  });
                }}>
                <Image style={{width:60, height: 60,marginBottom:10}} source={require('../assets/flashonn.png')} />
                
               
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={()=>this.takePicture()}

                >
                <Image style={{width:60, height: 60,marginBottom:10}} source={require('../assets/capture.png')} />
                
               
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  marginBottom:10,
                }}
                onPress={() => {
                  this.setState({
                  
                  });
                }}>
                <Image style={{width:60, height: 60}} source={require('../assets/flashau.png')} />
                
               
              </TouchableOpacity>

             

              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  marginBottom:10,
                  marginRight:10
                }}
                onPress={() => {
                  this.setState({
                  
                  });
                }}>
                <Image style={{width:60, height: 60}} source={require('../assets/flashofff.png')} />
                
               
              </TouchableOpacity>
              
            </View>
          </Camera>
        </View>
      );
    }
  }
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});