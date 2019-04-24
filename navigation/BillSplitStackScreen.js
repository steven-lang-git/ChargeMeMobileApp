import React from 'react';
import {createStackNavigator} from 'react-navigation';
import BillSplit from '../screens/DrawerScreens/BillSplit/BillSplit';
import SplitByItem from '../screens/DrawerScreens/BillSplit/SplitByItem';
import SplitByItemPricing from '../screens/DrawerScreens/BillSplit/SplitByItemPricing';
import SplitByItemReview from '../screens/DrawerScreens/BillSplit/SplitByItemReview';
import SplitByItemAssociate from '../screens/DrawerScreens/BillSplit/SplitByItemAssociate';
import SplitByAmount from '../screens/DrawerScreens/BillSplit/SplitByAmount';
import SplitEvenlyReview from '../screens/DrawerScreens/BillSplit/SplitEvenlyReview';
import SelectFriend from '../screens/DrawerScreens/BillSplit/SelectFriend';
import ReceiptScanner from '../screens/DrawerScreens/BillSplit/ReceiptScanner';

const BillSplitStack = createStackNavigator({

    BillSplit: { screen: BillSplit, navigationOptions: {header: null}},
    SplitByItem: { screen: SplitByItem},
    SplitByItemAssociate: { screen: SplitByItemAssociate},
    SplitByItemPricing: {screen: SplitByItemPricing},
    SplitByItemReview: { screen: SplitByItemReview},
    SplitByAmount: { screen: SplitByAmount},
    SplitEvenlyReview: { screen: SplitEvenlyReview},
    SelectFriend: {screen:SelectFriend},
    ReceiptScanner: {screen:ReceiptScanner},
  },
  {
       initialRouteName: 'SplitByAmount',
  }
);


export default BillSplitStack;
