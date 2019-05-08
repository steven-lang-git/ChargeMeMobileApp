import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Switch,
  AsyncStorage
} from 'react-native';
import {Icon} from 'native-base'
import { Constants, Notifications, Permissions } from 'expo';

const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

export default class PushNotifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: null,
      isSwitchOnE: false,
    }
    this._handleToggleSwitch = this._handleToggleSwitch.bind(this);
  }
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="sitemap" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }

  componentDidMount(){
    AsyncStorage.getItem('isSwitchOnE').then((value) =>
      this.setState({isSwitchOnE: JSON.parse(value)}));
    console.log(this.state.isSwitchOnE);
    //this.registerForPushNotifications();
    //Notifications.addListener(this.handleNotification);

  }

  _handleToggleSwitch = (value) => {
    //onValueChange of the switch this function will be called
    AsyncStorage.setItem('isSwitchOnE', JSON.stringify(value));
    this.setState({ isSwitchOnE: value });
  }

/*  _handleNotification(notification) {
    alert(notification.data.value);
  }


  async registerForPushNotifications() {
    // check fox existing permission
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS    //if no existing permission granted ask user
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      //if no permission is granted exit the status
      if (status !== 'granted') {
        return;
      }
      //set switch to false
    }
    // get the token
    const token = await Notifications.getExpoPushTokenAsync();

    this.subscription = Notifications.addListener(this.handleNotification);

    this.setState({
      token,
    });
  }


  sendPushNotification(token = this.state.token, title = this.state.title, body = this.state.body) {
  return fetch('https://exp.host/--/api/v2/push/send', {
    body: JSON.stringify({
      to: token,
      title: title,
      body: body,
      data: { message: `${title} - ${body}` },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}
handleNotification = notification => {
    this.setState({
      notification,
    });
  };*/
  //Initial state false for the switch. You can change it to true just to see.
  //state = { switchValue: false };
  /*  _handleNotification(notification) {
      alert(notification.data.value);
    }


    async registerForPushNotifications() {
      // check fox existing permission
      const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS    //if no existing permission granted ask user
      if (status !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        //if no permission is granted exit the status
        if (status !== 'granted') {
          return;
        }
        //set switch to false
      }
      // get the token
      const token = await Notifications.getExpoPushTokenAsync();

      this.subscription = Notifications.addListener(this.handleNotification);

      this.setState({
        token,
      });
    }


    sendPushNotification(token = this.state.token, title = this.state.title, body = this.state.body) {
    return fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
        title: title,
        body: body,
        data: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  }
  handleNotification = notification => {
      this.setState({
        notification,
      });
    };*/
    //Initial state false for the switch. You can change it to true just to see.
    //state = { switchValue: false };
  render() {
    console.log(this.state.isSwitchOnE);
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../../assets/blue.jpg')} style={styles.imageContainer}>
          <View style={styles.overlay} />

          <View style={styles.label}>
          <Text>
            <Text style={styles.labeltxt}>EMAIL NOTIFICATIONS </Text>
          </Text>
          <View style={styles.switchContainer}>
            <Switch
              value={this.state.isSwitchOnE}
              onValueChange = {this._handleToggleSwitch}

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
  },
  switchContainer:{
    padding: 10,
    paddingTop: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  header:{
    fontSize:24,
    color: "#000",
    paddingBottom: 10,
    marginBottom:40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  textinput: {
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 40,
    marginBottom: 30,
    color: "#000",
  },
  label: {
    alignSelf: 'stretch',
    paddingTop: 20,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labeltxt:{
    fontSize: 22,
    color: 'white',
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
