import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,Image, ListView, FlatList,Dimensions } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'
import {Camera, Permissions} from 'expo';
let{width,height} = Dimensions.get('window')

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





          <View
          style={{
            position:'absolute',
            top: -width/2 + 30,
            left: -width/2 +75,
            right: -width/2 + 75,
            bottom: -width/2 + 100,

            borderWidth: width/2,
            borderColor: 'rgb(32,53,70)',
            opacity:0.9,
          }}
          />
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={()=>this.takePicture()}

                >
                <Image style={{width:60, height: 60,marginBottom:10}} source={require('../../../assets/capture.png')} />


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
