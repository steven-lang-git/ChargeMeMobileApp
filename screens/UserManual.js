import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

export default class UserManual extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="sitemap" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>

            <Text style={styles.title}>
              What is the system used for and what problem does it solve?
            </Text>

            <Text style={styles.content}>
              ChargeMe is a web application that is designed to help friends, family, and acquaintances make the experience
              of splitting a bill easier, quicker, and more efficient. With features such as keeping running tabs and tracking
              debt, users can be reminded of the debt they owe and wait for accrue a large tab rather than making multiple small
              transactions. The goal is to make the transaction process more efficient so the user can scan receipts and the
              application will read the text and make the usually manual process into an automatic one. By having the item name
              and prices uploaded to the application instantly, the inconveniences of splitting bills are eliminated and this
              makes the whole process go by seamlessly. {"\n\n"}

              Currently there are bill splitting mobile applications such as Tab and Billr, but those apps only remind their
              users through text messages or email and calculate the split bill with tips/tax for them. ChargeMe not only
              includes all of that but includes an easier way of connecting to third-party applications like Venmo and Paypal.
              It allows users to instantly charge others through premade accounts. If users do not prefer Venmo or Paypal, they
              can use their in-app wallet, add their credit card or bank account. We are focusing on a simple, accessible, and
              useful design that will provide users with an application that will provide the best experience. {"\n\n"}

              The main objective in developing the ChargeMe App is to solve the issue of the strenuous process of splitting an
              invoice, bill, or an order with others. By creating a service that will make splitting complicated bills with
              parties easier, it will also improve the efficiency of restaurant eating and trip planning as well. By instantly
              record invoice data and document debt on others, the app allows users to save hours of valuable time and ensures
              that their experience will be a lot more convenient.
            </Text>


            <Text style={styles.title}>
              What are the features of the system, how to get started, and how to carry out the most important tasks? {"\n\n"}
              Main Features:
            </Text>

            <Text style={styles.content}>
              <Strong>Creating an Account</Strong> - The user must create an account with their personal information and attach their credit
              card, bank account, or other third-party apps. {"\n"}

              <Strong>Searching/Adding Other Users</Strong> -  Users can find other users by searching for another username, phone
              number, or email. There will also be suggestions where users can add and find friends based on mutual friends
              - or share the same friends as another user. {"\n"}

              <Strong>Manually Inputting / Scanning Receipts</Strong> - Users will have the option to manually input or scan the
              receipt of all the items, needed descriptions, and price of each item. {"\n"}

              <Strong>Accessing Bank Account / Third-Party App</Strong> - When a user gets charged, he or she will then be charged
              through their bank account or credit card that they have attached to the account. The user may scan the credit
              card using the same technology as the receipt scanner which will read the text on the surface of the card. {"\n"}

              <Strong>Splitting a Bill</Strong> - When the user chooses the Bill Split option, the user will first choose all friends
              that they want to charge. Then they will scan the receipt or manually input each item and their corresponding
              prices. Lastly, they will choose how to split the bill, by item or split evenly, and charge each person. The
              user may even be able to choose this option beforehand so that each person on the tab can create an open bill
              and have each bill update as items are added. The other option is that the user can add a receipt by choosing
              the receipt scanner. That function will read the text and create items that can be assigned to each person on
              the tab. {"\n"}

              <Strong>Completing a Charge</Strong> - There will be a button for current transactions. The user may select from that
              list of transactions which one to fulfill. Once the user wants to complete a transaction, the user will be
              prompted to choose a type of payment. Once the request is fulfilled, the transaction will then be moved to
              past/completed transactions. {"\n"}

              <Strong>Transferring Money to / From Bank Account</Strong> - If there is no money in a user’s account then the user will
              automatically be charged through the bank account they have linked to their application account. However, if a
              user has enough money in their virtual wallet they will be given the option to charge to their existing balance,
              credit card, bank account, or the third-party app that they have connected to their account. {"\n"}

              <Strong>Setting-Up Reminders / Notifications</Strong> - this feature allows users to remind other users to complete a
              transaction. Users will also have the option to receive notifications when a transaction has been started,
              completed, or canceled. If the user gets charged through a third-party application, the request will be sent
              through that application.
            </Text>

          </ScrollView>
        </View>
      </View>
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
  color: 'black',
  fontWeight: 'bold',
  fontSize: 24,
  textAlign:'left',
  marginTop: 20,
  marginBottom: 20,
  marginLeft: 20,
  marginRight: 20
},
content:{
  color: 'black',
  fontSize: 22,
  textAlign:'justify',
  marginBottom: 20,
  marginLeft: 20,
  marginRight: 20
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
