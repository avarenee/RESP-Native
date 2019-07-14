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
import { Container, Header, Content, Form, Item, Input } from 'native-base';

const { Stitch, AnonymousCredential } = require('mongodb-stitch-react-native-sdk');
const MongoDB = require('mongodb-stitch-react-native-services-mongodb-remote');

export default class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      atlasClient: undefined,
      found: undefined,
      missing: undefined,
      checkedin: [],
      first: "",
      last: "",
      mi: ""
    };
    this._loadClient = this._loadClient.bind(this);
    this._getFound = this._getFound.bind(this);
    this.saveCheckedIn = this.saveCheckedIn.bind(this);
    this.addFound = this.addFound.bind(this);
  }

  componentDidMount() {
    this._loadClient();
  }

  _loadClient() {
    Stitch.initializeDefaultAppClient("resp-nqkab").then(client => {
      this.setState({ client });
      this.state.client.auth
        .loginWithCredential(new AnonymousCredential())
        .then(user => {
          console.log(`Successfully logged in as user ${user.id}`);
          this.setState({ currentUserId: client.auth.user.id });
        })
        .catch(err => {
          console.log(`Failed to log in anonymously: ${err}`);
          this.setState({ currentUserId: undefined });
        });
        this._getItems();
    });
  }

  _getFound() {
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      MongoDB.RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    this.setState({found: mongoClient.db("sample_disaster").collection("found")});
    this.setState({missing: mongoClient.db("sample_disaster").collection("missing")});
  }

  saveCheckedIn() {
    this.state.found
      .find({}, {limit: 1000})
      .asArray()
      .then(checkedin => {
        this.setState({checkedin});
      });
  }

  addFound(event) {
    event.preventDefault();
    const { first } = this.state;
    const { last } = this.state;
    const { mi } = this.state;
    const itemToAdd = {"first" : first,
                       "last" : last,
                       "mi" : mi};
    this.state.found
      .insertOne(itemToAdd)
      .then(this.displayTodos)
      .catch(console.error);
  }

  render() {
    return(
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="First Name" />
            </Item>
            <Item>
              <Input placeholder="Last Name" />
            </Item>
            <Item last>
              <Input placeholder="Middle Initial" />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('CheckIn', () => CheckIn);
