import React from 'react';
import { YellowBox } from 'react-native';
import { Root } from 'native-base';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
// HomeStack
import Home from './containers/Home/Home';
import BarcodeScanner from './containers/Home/BarcodeScanner';
import SearchResult from './containers/Home/SearchResult';
// AboutStack
import About from './containers/About/About';
// Common
import WebView from './containers/Common/WebView';

// Dirty fix for react-navigation issue & react-native issue
// https://github.com/react-navigation/react-navigation/issues/3956
// https://github.com/facebook/react-native/issues/18201
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Class RCTCxxModule was not exported',
]);

const HomeStack = createStackNavigator({
  Home: { screen: Home },
  BarcodeScanner: { screen: BarcodeScanner },
  SearchResult: { screen: SearchResult },
  SearchWebView: { screen: WebView },
});

const AboutStack = createStackNavigator({
  About: { screen: About },
  AboutWebView: { screen: WebView },
});

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarLabel: '書本搜尋',
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-search" size={25} color={tintColor}/>,
      }),
    },
    About: {
      screen: AboutStack,
      navigationOptions: () => ({
        tabBarLabel: '關於我們',
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-information-circle" size={25} color={tintColor}/>,
      }),
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'rgba(202, 93, 59, 1)',
      inactiveTintColor: 'rgba(128, 128, 128, 1)',
    },
  },
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
