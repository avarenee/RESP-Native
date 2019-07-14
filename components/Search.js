import React, {Fragment, Component} from 'react';
import {
  AppRegistry,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {createStackNavigator, createAppContainer} from 'react-navigation';

const { Stitch, AnonymousCredential } = require('mongodb-stitch-react-native-sdk');
const MongoDB = require('mongodb-stitch-react-native-services-mongodb-remote');

export default class Search extends Component {
  render() {
    return(
      <Text>Search</Text>
    );
  }
}

AppRegistry.registerComponent('Search', () => Search);
