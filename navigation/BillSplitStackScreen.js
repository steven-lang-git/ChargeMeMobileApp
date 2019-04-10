import React from 'react';
import {createStackNavigator} from 'react-navigation';
import BillSplit from '../screens/DrawerScreens/BillSplit/BillSplit';
import SplitByItem from '../screens/DrawerScreens/BillSplit/SplitByItem';
import SplitEvenly from '../screens/DrawerScreens/BillSplit/SplitEvenly';
import SelectFriend from '../screens/DrawerScreens/BillSplit/SelectFriend';
import ReceiptScanner from '../screens/DrawerScreens/BillSplit/ReceiptScanner';

const BillSplitStack = createStackNavigator({

    BillSplit: { screen: BillSplit, navigationOptions: {header: null}},
    SplitByItem: { screen: SplitByItem},
    SplitEvenly: { screen: SplitEvenly},
    SelectFriend: {screen:SelectFriend},
    ReceiptScanner: {screen:ReceiptScanner},
  },
  {
       initialRouteName: 'BillSplit',
  }
);


export default BillSplitStack;
