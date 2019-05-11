import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'firebase'
import RNFetchBlob from 'rn-fetch-blob'
import CameraRollPicker from 'react-native-camera-roll-picker'
import AwesomeAlert from 'react-native-awesome-alerts';

const { width, height } = Dimensions.get("window");

const resetToDashboard = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
});


let fName = ''
let lName = ''
let user = ''
let email = ''
let phone = ''
let birthday = ''
let showAlert = false
let image = ''
let imagePicked = false

export default class Gallery extends React.Component {
  constructor(props){
    super(props);
    fName = ''
    lName = ''
    user = ''
    email = ''
    phone = ''
    birthday = ''
    showAlert = false
    image = ''
    imagePicked = false
  }

//function called when an image is selected
  getSelectedImages = (selectedImages, currentImage) => {
    //determine if there is an activelt selected image
    if(image == currentImage.uri){
      imagePicked = false
    }
    else{
      imagePicked = true
    }
    //get the selected image's uri
    image = currentImage.uri
  }

//function called when "select image" button is pressed to upload it into firebase storage
  setProfilePic=()=>{

    //if there is an active picked image
    if(imagePicked == true){

      //render loading alert
      showAlert = true
      this.forceUpdate()

      //get current user's uid
      var uid = firebase.auth().currentUser.uid;


      //create image blob
      const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob


      let uploadBlob = null
      const imageRef = firebase.storage().ref(uid ).child('/profilePic')
      let mime = 'image/jpg'
      fs.readFile(image, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {

          //write user info
          firebase.database().ref('users/' + uid).set({
            username: user,
            firstName: fName,
            lastName: lName,
            email: email,
            phone: phone,
            birthday: birthday,
            profilePic: url,
          })
          .then(
            //navigate back to dashboard
            this.props.navigation.dispatch(resetToDashboard)
          );
        })
        .catch((error) => {
          console.log(error);
        })
      }
  }

  componentDidMount(){

    var uid = firebase.auth().currentUser.uid;

    // gets user data
    firebase.database().ref('users/'+uid).once("value", snapshot => {
      fName = snapshot.val().firstName;
      lName = snapshot.val().lastName;
      user = snapshot.val().username;
      email = snapshot.val().email;
      phone = snapshot.val().phone;
      birthday = snapshot.val().birthday;
    });
  }

  render() {

    return (
      <View style={styles.container}>

        <View style ={{flex: 6}}>
            <CameraRollPicker
              selectSingleItem={true}
              callback={this.getSelectedImages}
              groupTypes={'SavedPhotos'}
            />
        </View>

        <View style={{flex:1, justifyContent: 'center'}}>
          <Text
            style={styles.gallery}
            onPress={this.setProfilePic}
            >
              Set as Profile Picture
          </Text>
        </View>

        <AwesomeAlert
            show={showAlert}
            showProgress={true}
            title="Uploading... "
            titleStyle={{textAlign: 'center'}}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  gallery: {
    fontSize: width/21,
    color: 'dodgerblue'
  }
});
