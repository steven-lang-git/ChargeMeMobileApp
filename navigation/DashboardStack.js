import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Dashboard from '../screens/DrawerScreens/Dashboard';
import Gallery from '../screens/DrawerScreens/Gallery';

const DashboardStack = createStackNavigator({
  Dashboard: {screen: Dashboard, navigationOptions: {header: null}},
  Gallery: {screen: Gallery, navigationOptions: {title: 'Camera Roll'}},
  },
  {
    initialRouteName: 'Dashboard',
  }
);


export default DashboardStack;
