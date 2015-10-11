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

var NavigationBar = require('react-native-navbar');
var EntryList = require('./EntryList.android.js');

var ReactVideoStreamingPlayer = React.createClass({

  renderScene: function(route, nav) {
    var Component = route.component;
    var navBar = route.navigationBar;

    if (navBar) {
      navBar = React.addons.cloneWithProps(navBar, {
        navigator: nav,
        route: route
      });
    }

    return (
      <View style={styles.navigator}>
        {navBar}
        <Component {...route.passProps} navigator={nav} route={route} />
      </View>
    );
  },

  configureScene: function(route) {
    return Navigator.SceneConfigs.FloatFromBottom;
  },

  render: function() {
    return (
      <Navigator
        style={styles.navigator}
        initialRoute={{
          component: EntryList,
          navigationBar: <NavigationBar title='Featured Entlies' />
        }}
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
