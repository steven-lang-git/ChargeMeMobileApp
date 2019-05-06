import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ListView,
  FlatList,
  Dimensions,
  ImageBackground,
  Platform,
  Button,
} from "react-native";
import { Header, Left, Right, Icon } from "native-base";
import { Camera, Permissions } from "expo";
import ImagePicker from 'react-native-image-picker';
import Ocr from 'react-native-tesseract-ocr';

import RNTextDetector from "react-native-text-detector";
import ButtonComponent from "../../../components/ButtonComponent";

let { width, height } = Dimensions.get("window");


const imagePickerOptions ={
  quality: 1.0,
  storageOptions: {
    skipBackup: true,
  },
};
const tessOptions ={
  whitelist: null,
  blacklist: null
};


export default class ReceiptScanner extends React.Component {
  static navigationOptions = {
    drawerIcon: tintColor => (
      <Icon
        name="camera"
        type="FontAwesome"
        style={{ fontSize: width/15.625, color: tintColor }}
      />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      path: null,
      imageProperties: null,
      data: null,
      imageSource: null,
      text:'',
      photo:null,
    };
  this.selectImage = this.selectImage.bind(this);
  }
  
  selectImage(){

    ImagePicker.showImagePicker(imagePickerOptions, (response)=>
    {
      console.log('Response =',response);
      if(response.didCancel){
        console.log('User cancelled image picker');
      }
      else if(!response.didCancel){
        const source = {uri:response.uri};
        this.setState({imageSource:source});
        this.extractText(response.path);
      }
    });
  }
  handleChoosePhoto =() => {
    const options ={
      noData: true
    };
    ImagePicker.launchImageLibrary(options,response=>{
      console.log("response",response);
      if(response.uri){
        this.setState({photo:response});
        this.extractText(response.path);
      }
    });
  };
  extractText(imgPath){
    Ocr.recognize(imgPath, 'LANG_ENGLISH', tessOptions)
    .then((res)=> this.setState({text:res}));
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  press = async () => {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      console.log(data);
      this.setState({
        path: data.uri,
        data: data,
        imageProperties: {height: data.height, width: data.width},
      });
    }
  };

  processImage =async() =>{
    console.log("did we get here?");
   const{data} =this.state;
   console.log("1");
   console.log(data);
   console.log('uri',data.uri);
   console.log('path?',data.path);
    const visionResp = await RNTextDetector.detectFromUri(data.uri);
    console.log("2");
    console.log('visionResp',visionResp);
    if(!(visionResp && visionResp.length >0)){
      throw "unmatched";
    }
    this.setState({
      visionResp: this.mapVisionRespToScreen(visionResp, imageProperties)
    });
  };
  renderImage() {
    return (
      <View>
        <Image source={{ uri: this.state.path }} style={styles.preview} />
        <View style={styles.buttonContainer}>
          <ButtonComponent
            containerStyle={styles.cancel}
            onPress={() => this.setState({ path: null })}
            text="Cancel"
            disabled={false}
            primary={true}
          />
           <ButtonComponent
            containerStyle={styles.scan}
            onPress={this.processImage.bind(this)}
            text="Scan Receipt"
            disabled={false}
            primary={false}
          />
        </View>
      </View>
    );
  }
  renderImagePick(){
    return (
      <View style ={{position:'absolute', flex:1, alignItems: "center", justifyContent:"center", marginTop:20}}>
      {photo&&(<Image
        source={{uri:photo.uri}}
        style={{width:300,height:300}}
        
      />)}
      <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
     </View>
    );
  }

  renderCamera() {
    const { hasCameraPermission } = this.state;
    const {photo} =this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: -width / 2 + (width/12.5),
                  left: -width / 2 + (width/5),
                  right: -width / 2 + (width/5),
                  bottom: -width / 2 + (width/37.5),

                  borderWidth: width / 2,
                  borderColor: "rgb(32,53,70)",
                  opacity: 0.9
                }}
              />
              <View style ={{position:'absolute', flex:1, alignItems: "center", justifyContent:"center"}}>
      {photo&&(<Image
        source={{uri:photo.uri}}
        style={{width:300,height:300}}
        
      />)}
      <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
     </View>

              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={this.press.bind(this)}
              >
                <Image
                  style={{ width: width/6.25, height: width/6.25, marginBottom: width/37.5 }}
                  source={require("../../../assets/capture.png")}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }

  render() {
    // const {imageSource} = this.state;
    const {photo} =this.state;



    return (
      
     
      <View style={styles.container}>
       
        {this.state.path ? this.renderImage() : this.renderCamera()}
        <Text>{this.state.text}</Text>
      </View>

    );
  
    //  return(
     
    
  //  )
   
    // return(
    //   <View style={{flex:1}}>
    //     <TouchableOpacity onPress={this.handleChoosePhoto}>
    //       <View >
    //       {
    //         photo === null
    //         ? <Text> Tap me!</Text>
    //         : <Image style={styles.preview} source={photo}/>
    //       }
    //       </View>
    //     </TouchableOpacity>
    //     <Text>{this.state.text}</Text>
    //   </View>
    // );
  }
}

ReceiptScanner.navigationOptions ={
  title: 'Scan Your Receipt',

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: width/75,
    color: "#000",
    padding: width/37.5,
    margin: width/9.375
  },
  cancel: {
    position: "absolute",
    left: width/75,
    top: width/75,
    backgroundColor: "transparent",
    color: "#FFF",
    fontWeight: "600",
    fontSize: width/22.0588
  },
  scan:{
    color: "#FFF",
    marginLeft:50,
  },
  imageContainer: {
    resizeMode: "cover",
    flex: 1
  },
  buttonContainer: {
    width: width / 3,
    flex: 0,
    backgroundColor: "transparent",
    position: "absolute"
  }
});
