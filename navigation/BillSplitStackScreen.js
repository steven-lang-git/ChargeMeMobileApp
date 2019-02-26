import React from 'react';
import {createStackNavigator} from 'react-navigation';
import BillSplit from '../screens/BillSplit';
import SplitByItem from '../screens/SplitByItem';
import SplitEvenly from '../screens/SplitEvenly';

const BillSplitStack = createStackNavigator({
    BillSplit: { screen: BillSplit},
    SplitByItem: { screen: SplitByItem},
    SplitEvenly: { screen: SplitEvenly},
  },
  {
       initialRouteName: 'BillSplit',
  }
);

export default BillSplitStack;
