/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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
import CheckIn from './CheckIn';
import Search from './Search';

export class RESPHome extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return(
      <Fragment>
        <SafeAreaView>
          <Text>RESP</Text>
          <Button
            title="+ New Check-in"
            onPress={() => navigate('CheckIn')}
          />
          <Button
           title="New Search"
           onPress={() => navigate('Search')}
          />
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
  },
});

const MainNavigator = createStackNavigator({
  Home: {screen: RESPHome},
  CheckIn: {screen: CheckIn},
  Search: {screen: Search}
});

const App = createAppContainer(MainNavigator);

export default App;
