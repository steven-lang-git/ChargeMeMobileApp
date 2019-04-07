import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ImageBackground
} from 'react-native';

export default class UserManual extends React.Component {

  render() {
    return (


      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../../assets/blue.jpg')} style={styles.imageContainer}>
          <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>




            <Text style={styles.title}>
              WHAT IS THE SYSTEM USED FOR AND WHAT PROBLEM DOES IT SOLVE?
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

              Currently there are bill splitting mobile applications such as Tab and Billr, but those apps only remind their
              users through text messages or email and has a bill split feature where the tax and tip is already calculated for
              the user. ChargeMe will include all of those features and will also include another method of payment by allowing
              users to connect ChargeMe to other third-party applications like Venmo and Paypal. This allows users to instantly
              charge others through premade accounts. However, if users do not have a Venmo or Paypal account, they can use
              their in-app wallet by adding their debit card or bank account. We are focusing on a simple, accessible, and
              useful design that will provide users with an application that will provide the best experience. {"\n\n"}

              The main objective in developing the ChargeMe App is to solve the issue of the strenuous process of splitting an
              invoice, bill, or an order with others. By creating a service that will make splitting complicated bills with
              parties easier, it will also improve the efficiency of restaurant eating and trip planning as well. By instantly
              record invoice data and document debt on others, the app allows users to save hours of valuable time and ensures
              that their experience will be a lot more convenient.
            </Text>


            <Text style={styles.title}>
              WHAT ARE THE FEATURES OF THE SYSTEM, HOW TO GET STARTED, AND HOW TO CARRY OUT THE MOST IMPORTANT TASKS? {"\n\n"}
              Main Features:
            </Text>

            <Text style={styles.features}>
              <Strong>Make Payments</Strong> - Once a bill split transaction is in progress, the charge will appear in each
              user’s current transactions list. The user will be given the option to accept or decline the charge. If the user
              chooses to accept, they will be prompted to choose their type of payment and will be charged. Once the request is
              fulfilled, the transaction will then be moved to past transactions list. If the user chooses to decline, it will
              be removed from their current transactions list and they will not be charged.{"\n\n"}

              <Strong>Link Bank Account and Debit Card</Strong> - In order to complete a transaction the user must have a way(s)
              to pay their debt. Users have the ability to connect their bank account or debit card to their ChargeMe account.
              They can add or update their payments method through their account settings.{"\n\n"}

              <Strong>Split Bill Evenly or By Item</Strong> - Bill Split allows the users to split a bill and charge other
              users. First the user will choose if they want to split the bill evenly or by item. Then the user will choose
              their friends that they want to charge. If the user chooses to split the bill evenly they will input the total
              amount and choose the tip amount. On the other hand, if the user chooses to split the bill by item then they can
              scan the receipt or manually input each item and their corresponding price. Then they will have to note which
              user is being charged for each item and choose a tip amount. Lastly, each user will be notified of the charge and
              will be give the option to accept or decline the charge.{"\n\n"}

              <Strong>Money Transfer to Bank</Strong> - If the user has a balance greater than zero in their virtual wallet they
              will be given the option to transfer the whole or partial balance to their bank account. An additional fee will be
              added if the user would like to expedite the transfer.{"\n\n"}

              <Strong>Receipt and Debit Card Scanner</Strong> - Users will be given the option to scan a receipt or debit card
              instead of manually inputting the information. Scanning a receipt will allow the application to read the item
              names and prices. Whereas, scanning a debit card will read the name on the card, card number, expiration date,
              and security code. The information will then be saved into the database.{"\n\n"}

              <Strong>Track Current and Past Transactions</Strong> - Current transactions will display pending transactions that
              the user requested to other users and requested transactions from other users that the user needs to either accept
              or decline. Past transactions will show a history of completed transactions.{"\n\n"}

              <Strong>Setup Reminders and Notifications</Strong> - Reminders will allow the user to remind other users to
              complete a pending transaction. Users will also have the option to receive notifications when a transaction has
              been started, completed, or canceled.{"\n\n"}

              <Strong>Social Currency</Strong> - Increases a user’s sense of community, granting access to knowledge and
              information, and helping create our own identities, as well as providing status and recognition.{"\n\n"}

              <Strong>Data Encryption</Strong> - Users information and data will be encrypted into a secret code using a
              secret key or password that will be needed to decrypt the information. This will ensure that user information will
              be safe from being hacked or stolen from adversaries.{"\n\n"}

              <Strong>Data Storage</Strong> - Allows the user to store their personal information and information on past and
              current transactions.{"\n\n"}

              <Strong>Mobile-First</Strong> - ChargeMe is a mobile application that users can download on their phones and
              access at any time or location that has access to the internet.{"\n\n"}

              <Strong>Authentication & Authorization</Strong> - User authentication will be needed in order to login into their
              account and process or complete a transaction. This allows the application to verify that the user is who they
              claim to be. Authorization will allow user permissions to certain pages and resources based on their account and
              user preferences.{"\n\n"}

              <Strong>Account Settings</Strong> - The user must create an account with their personal information and payment
              methods. A user may update or change their account and preferences when necessary.

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
features:{
  color: 'white',
  fontSize: 22,
  textAlign:'left',
  marginBottom: 20,
  marginLeft: 40,
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
