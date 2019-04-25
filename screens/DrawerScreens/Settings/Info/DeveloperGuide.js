import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  LinkingIOS,
  Linking,
  SafeAreaView,
  ImageBackground
} from 'react-native';

export default class DeveloperGuide extends React.Component {

  render() {
    return (

      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../../assets/blue.jpg')} style={styles.imageContainer}>
          <View style={styles.overlay} />


      <View style={styles.container}>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>


            <Text style={styles.title}>
              WHAT IS THE PROJECT?
            </Text>

            <Text style={styles.content}>
              ChargeMe is a mobile application that is designed to help friends, family, and acquaintances make the experience
              of splitting a bill easier, quicker, and more efficient. With features such as making payments and bill split,
              users can choose how they want to split a bill and divide the total bill amount between each user rather than
              making multiple individual transactions. The goal is to make the transaction process faster and more efficient.
              For example, the user can scan receipts or their debit cards. This will allow the application to read the text
              and save the data to the database rather than making the users manually input all of the information. By having
              the item names and prices uploaded to the application database instantly, the inconveniences of splitting bills
              are eliminated; therefore, making this whole process go by seamlessly. {"\n\n"}

              The main objective in developing the ChargeMe App is to solve the issue of the strenuous process of splitting an
              invoice, bill, or an order with others. By creating a service that will make splitting complicated bills with
              parties easier, it will also improve the efficiency of restaurant eating and trip planning as well. By instantly
              record invoice data and document debt on others, the app allows users to save hours of valuable time and ensures
              that their experience will be a lot more convenient.
            </Text>


            <Text style={styles.title}>
              WHAT ARE THE FEATURES?
            </Text>

            <Text style={styles.bullets}>
              {'\u2022'} Make Payments
              {'\n\u2022'} Link Bank Account and Debit Card
              {'\n\u2022'} Split Bill Evenly or By Item
              {'\n\u2022'} Money Transfer to Bank
              {'\n\u2022'} Receipt / Debit Card Scanner
              {'\n\u2022'} Track Current and Past Transactions
              {'\n\u2022'} Setup Reminders and Notifications
              {'\n\u2022'} Social Currency
              {'\n\u2022'} Data Encryption
              {'\n\u2022'} Data Storage
              {'\n\u2022'} Mobile-First
              {'\n\u2022'} Authentication & Authorization
              {'\n\u2022'} Account Settings
            </Text>


            <Text style={styles.title}>
              HOW TO INSTALL?
            </Text>

            <Text style={styles.bullets}>
              <Strong>1.</Strong> Download the Project from GitHub
              {'\n\t'} <Strong>a.</Strong> Open a web browser
              {'\n\t'} <Strong>b.</Strong> Go to the following GitHub link:
              {'\n\t'}<Text style={styles.hyperlink} onPress={() => Linking.openURL
                ('https://github.com/scubaastev/ChargeMeMobileApp')}>
                  https://github.com/scubaastev/ChargeMeMobileApp
              </Text>
              {'\n\t'} <Strong>c.</Strong> Click the ‘Download’ button and save all the files into a single folder

              {'\n\n'}
              <Strong>2.</Strong> Open the Project and Download all Dependencies
              {'\n\t'} <Strong>a.</Strong> Open a web browser
              {'\n\t\t'} <Strong>i.</Strong> Go to the following GitHub link:
              {'\n\t\t'}<Text style={styles.hyperlink} onPress={() => Linking.openURL
                ('https://github.com/steven-lang-git/ChargeMeMobileApp/blob/master/README.md')}>
                  https://github.com/steven-lang-git/ChargeMeMobileApp/blob/master/README.md
              </Text>
              {'\n\t'} <Strong>b.</Strong> Open a Terminal Window
              {'\n\t\t'} <Strong>i.</Strong> cd into the project directory
              {'\n\t\t'} <Strong>ii.</Strong> Follow the README.md directions from the web browser
              {'\n\t\t\t'} <Strong>1.</Strong> Install React Native and all necessary dependencies

              {'\n\n'}
              <Strong>3.</Strong> Compile and Run Project
              {'\n\t'} <Strong>a.</Strong> Open a Terminal Window
              {'\n\t'} <Strong>b.</Strong> cd into the project directory
              {'\n\t'} <Strong>c.</Strong> Run the following command in the folder
              {'\n\t\t'} <Strong>i.</Strong> expo start


              {'\n\n'}
              <Strong>4.</Strong> Emulate on iOS
              {'\n\t'} <Strong>a.</Strong> Download the Expo Client App
              {'\n\t'} <Strong>b.</Strong> Set the QR code is on Tunnel
              {'\n\t'} <Strong>c.</Strong> Scan QR code through QR code scanner or iOS camera
              {'\n\t'} <Strong>d.</Strong> Open application through Expo Client


            </Text>


            <Text style={styles.title}>
              WHAT ARE THE COMPONENTS?
            </Text>

            <Text style={styles.bullets}>
              {'\u2022'} React Native App
              {'\n\t\u2022'} JavaScript
              {'\n\t\u2022'} React
              {'\n\u2022'} Database
              {'\n\t\u2022'} Firebase
            </Text>


            <Text style={styles.title}>
              HOW TO CONTRIBUTE?
            </Text>

            <Text style={styles.text}>
              Source Code:
            </Text>
            <Text style={styles.hyperlink} onPress={() => Linking.openURL('https://github.com/scubaastev/ChargeMeMobileApp')}>
                https://github.com/scubaastev/ChargeMeMobileApp
            </Text>


            <Text style={styles.title}>
              WHAT IS THE SUPPORT?
            </Text>

            <Text style={styles.text}>
              If there are any issues or further questions please check the FAQs section or email us at
            </Text>
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
bold:{
  fontWeight: 'bold'
},
title:{
  color: 'white',
  fontWeight: 'bold',
  fontSize: 24,
  textAlign:'left',
  marginTop: 20,
  marginBottom: 20,
  marginLeft: 20,
  marginRight: 20
},
content:{
  color: 'white',
  fontSize: 22,
  textAlign:'left',
  marginBottom: 20,
  marginLeft: 20,
  marginRight: 20
},
text:{
  color: 'white',
  fontSize: 22,
  textAlign:'left',
  marginLeft: 20,
  marginRight: 20
},
bullets:{
  color: 'white',
  fontSize: 22,
  textAlign:'left',
  marginBottom: 20,
  marginLeft: 40,
  marginRight: 20
},
hyperlink:{
  color: '#34c6de',
  fontSize: 22,
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

class Strong extends Component{
  render() {
    return (
    <Text style={styles.bold}>
      {this.props.children}
    </Text>);
  }
}
