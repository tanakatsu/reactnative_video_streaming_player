/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} = React;

var EntryList = require('./EntryList.android.js');
var EntryDetail = require('./EntryDetail.dummy.js');
var SearchEntry = require('./SearchEntry.android.js');

var ReactVideoStreamingPlayer = React.createClass({

  renderScene: function(route, nav) {
    switch(route.id) {
      case 'entrylist':
        return (<EntryList {...route.passProps} navigator={nav} />);
      case 'entrydetail':
        return (<EntryDetail navigator={nav} />);
      case 'searchentry':
        return (<SearchEntry navigator={nav} />);
    }
  },

  configureScene: function(route) {
    return Navigator.SceneConfigs.FloatFromBottom;
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{id: 'entrylist'}}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactVideoStreamingPlayer', () => ReactVideoStreamingPlayer);
