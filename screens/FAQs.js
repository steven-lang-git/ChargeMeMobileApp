import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, LinkingIOS, Linking} from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

export default class FAQs extends React.Component {
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


            <Text style={styles.section}>
              SIGNING IN
            </Text>

            <Text style={styles.question}>
              How can I reset my password?
            </Text>
            <Text style={styles.answer}>
              <Text>
                If you do not remember your password or are concerned about the security of your account, you can change
                your password
              </Text>
              <Text style={styles.hyperlink}
                  onPress={() => this.props.navigation.navigate('ChangePassword')}> {`HERE`}
              </Text>
              <Text>
                .
              </Text>
            </Text>

            <Text style={styles.question}>
              Why am I getting an error when I try to sign in?
            </Text>
            <Text style={styles.answer}>
              ChargeMe is currently only supported within the United States, and as a result attempting to sign in from abroad
              will often result in errors that we are unable to help resolve. {'\n\n'}

              Note that ChargeMe is only able to support use of the app with Apple iOS 10.0 or Android 5.0 Lollipop (API 21) or
              higher devices at this time. If your device does not meet these requirements, please contact your phone carries
              to ask about a upgrade.{'\n\n'}

              If you are still receiving an error while using a compatible device within the United States be sure to check
              that you are not using any sort of VPN and that you are successfully connected to a Wi-Fi network.
            </Text>


            <Text style={styles.section}>
              PAYMENT & REQUESTS
            </Text>

            <Text style={styles.question}>
              Can you cancel my payment?
            </Text>
            <Text style={styles.answer}>
              No - once you choose to complete a transaction the charge request is already sent to the payment method that is
              chosen. However, if you want to get the funds back, you can simply ask your friend to send you back a payment for
              the same amount.
            </Text>

            <Text style={styles.question}>
              Can I change where my payment is coming from?
            </Text>
            <Text style={styles.answer}>
              <Text>
                You can edit your payment method anytime before you complete your payment. When accepting a charge simply
                choose which payment method you want the charge to be applied to. If you would like to add or delete a payment
                methodsimply go to
              </Text>
                <Text style={styles.hyperlink}
                    onPress={() => this.props.navigation.navigate('PaymentMethods')}> {`PAYMENT METHODS `}
                </Text>
              <Text>
                  to edit your payment preferences. Please note, that it is not possible to change the payment method after you
                 have accepted a charge.
              </Text>
            </Text>

            <Text style={styles.question}>
              Where can I find details about my transaction history?
            </Text>
            <Text style={styles.answer}>
              <Text>You can go to the main menu where you can choose to view </Text>
              <Text style={styles.hyperlink}
                  onPress={() => this.props.navigation.navigate('PastTransactions')}> {`PAST TRANSACTIONS`}
              </Text>
              <Text> or </Text>
              <Text style={styles.hyperlink}
                  onPress={() => this.props.navigation.navigate('CurrentTransactions')}> {`CURRENT TRANSACTIONS`}
              </Text>
            <Text> to see your transaction history.</Text>
            </Text>

            <Text style={styles.question}>
              Can I connect ChargeMe to a third-party app to transfer money between the two?
            </Text>
            <Text style={styles.answer}>
              Unfortunately, at this time we have not been able to add the feature of a third party app to payment methods.
              However, we are working on this feature and hope to add it soon.
            </Text>


            <Text style={styles.section}>
              TRANSFERS TO BANK
            </Text>

            <Text style={styles.question}>
              Do payments sent to me automatically show up in my bank account?
            </Text>
            <Text style={styles.answer}>
              No - whenever you receive a payment from another user, the money is automatically added to your ChargeMe balance.
              In order for the money to be transferred to your bank, you need to initiate a bank transfer.
            </Text>

            <Text style={styles.question}>
              Can you rush my bank transfer?
            </Text>
            <Text style={styles.answer}>
              Unfortunately, there is no way to expedite the process of transferring your ChargeMe balance to your bank account.
              Once you initiate the transfer, the funds are deducted from your ChargeMe balance and are sent to your bank for
              processing. Bank transfers can take up to 3 business days to process.
            </Text>

            <Text style={styles.question}>
              Where is my bank transfer?
            </Text>
            <Text style={styles.answer}>
              It is possible that your bank could have back-dated the transfer to an unexpected date. We recommend checking your
              bank statement within a range of two days around the expected date that the transfer was supposed to be completed.
            </Text>


            <Text style={styles.section}>
              BANK ACCOUNTS & CARDS
            </Text>

            <Text style={styles.question}>
              Where can I see my payment methods?
            </Text>
            <Text style={styles.answer}>
              <Text>In the app settings, you can then go to </Text>
                <Text style={styles.hyperlink}
                    onPress={() => this.props.navigation.navigate('PaymentMethods')}> {`PAYMENT METHODS `}
                </Text>
              <Text>
                 where you should be able to see a list of bank accounts and debit cards thats you have already added to your
                ChargeMe account. You can also add or remove a payment method.
              </Text>
            </Text>

            <Text style={styles.question}>
              Can I use a prepaid card or gift card?
            </Text>
            <Text style={styles.answer}>
              We allow users to add prepaid cards registered under their name to be added to ChargeMe. Some cards may be
              declined by the card issuer or Venmo for insufficient funds or for fraud prevention reason. Also note that some
              payment cards may require you to provide a zip code in order for it to be linked to your account.
            </Text>

            <Text style={styles.question}>
              Are there fees to use ChargeMe?
            </Text>
            <Text style={styles.answer}>
              No additional charges will be applied when accepting a charge and paying using your debit card or bank account.
            </Text>

            <Text style={styles.question}>
              Can I change where my payment is coming from?
            </Text>
            <Text style={styles.answer}>
              The payment method and the amount being charged cannot be changed once it has been accepted and is in the process
              of being completed. The moment you send a payment in ChargeMe, the funds are authorized to be withdrawn from your
              chosen payment method.
            </Text>

            <Text style={styles.question}>
              Can a bank account or card be added to two separate Venmo accounts?
            </Text>
            <Text style={styles.answer}>
              Unfortunately, at this time each bank account or debit card can only be linked to one ChargeMe account. This
              requirement is in place to help prevent fraudulent transactions and protect the financial security of our users.
            </Text>

            <Text style={styles.question}>
              Why was my card charged $0/$1 when I added it to Venmo?
            </Text>
            <Text style={styles.answer}>
              Sometimes when people add their debit card to ChargeMe, they will see a small charge on their debit card statement
              for $0 to $1. This is a temporary authorization that we run on your card to confirm that the details that you
              entered are correct. Note that this is not an actual charge to your card. After we create this authorization, we
              cancel it so that you can use this money again. {'\n\n'}

              If you still see a $1 authorization from ChargeMe after 5-7 business days, please contact your bank and ask them
              to remove it for you. We already attempt to cancel all of these when we create them, and cannot take further
              action on our end once we do so.
            </Text>

            <Text style={styles.question}>
              Can a bank account or card be added to two separate Venmo accounts?
            </Text>
            <Text style={styles.answer}>
              Unfortunately, at this time we have not been able to add the feature of a third party app to payment methods.
              However, we are working on this feature and hope to add it soon.
            </Text>


            <Text style={styles.section}>
              SIGNING UP
            </Text>

            <Text style={styles.question}>
              Can I use ChargeMe outside of the United States?
            </Text>
            <Text style={styles.answer}>
              No - unfortunately, ChargeMe is only accessible within the United States.
            </Text>

            <Text style={styles.question}>
              What mobile operating systems is the ChargeMe app compatible with?
            </Text>
            <Text style={styles.answer}>
              ChargeMe is only able to support Apple iOS 10.0 or Android Lollipop (API 21) or higher devices at this time.
            </Text>

            <Text style={styles.question}>
              Where can I sign up?
            </Text>
            <Text style={styles.answer}>
              To sign up for ChargeMe, you must be in the United States, and have a mobile device that is compatible with the
              mobile app and can accept SMS messaging. You can download the app from the App Store or Play Store depending on
              your device. Once you open the app you can choose to create a new account or sign into your existing account.
            </Text>

            <Text style={styles.question}>
              Why does it say my phone number or email is already on file?
            </Text>
            <Text style={styles.answer}>
              It is possible that you have already made a ChargeMe account in the past. If so, then all you would need to do is
              sign in. However, if you do not remember your email or password you can simply request to change your login
              credentials.
            </Text>


            <Text style={styles.section}>
              ACCOUNT SETTINGS & SECURITY
            </Text>

            <Text style={styles.question}>
              How do I cancel my account?
            </Text>
            <Text style={styles.answer}>
              <Text>
                You can choose to cancel your ChargeMe account by clicking on “Cancel my ChargeMe Account” at the bottom of your
              </Text>
                <Text style={styles.hyperlink}
                    onPress={() => this.props.navigation.navigate('UserProfile')}> {`PROFILE`}
                </Text>
              <Text> section under settings.</Text>
            </Text>

            <Text style={styles.question}>
              How do I edit my account settings?
            </Text>
            <Text style={styles.answer}>
              <Text>You can edit your account setting by clicking on </Text>
                <Text style={styles.hyperlink}
                    onPress={() => this.props.navigation.navigate('SettingsScreen')}> {`SETTINGS`}
                </Text>
              <Text> from the navigation bar.</Text>
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
  flexDirection: 'row',
},
bold:{
  fontWeight: 'bold'
},
section:{
  color: 'black',
  fontWeight: 'bold',
  fontSize: 26,
  textAlign:'left',
  marginTop: 20,
  marginBottom: 20,
  marginLeft: 20,
  marginRight: 20
},
question:{
  color: 'black',
  fontWeight: 'bold',
  fontSize: 24,
  textAlign:'left',
  marginTop: 20,
  marginBottom: 20,
  marginLeft: 20,
  marginRight: 20
},
answer:{
  color: 'black',
  fontSize: 22,
  textAlign:'left',
  marginBottom: 20,
  marginLeft: 20,
  marginRight: 20
},
hyperlink:{
  color: '#007AFF',
  fontSize: 22,
  textAlign:'left',
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
