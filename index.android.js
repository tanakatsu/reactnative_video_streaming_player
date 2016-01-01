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
  Navigator,
  BackAndroid,
  ToolbarAndroid
} = React;

var EntryList = require('./EntryList.android.js');
var EntryDetail = require('./EntryDetail.android.js');

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  console.log("route.name=" + route.name);
  if (route.name === 'search') {
    return (
      <View style={{flex: 1}}>
        <EntryList navigator={navigationOperations} />
      </View>
    );
  } else if (route.name === 'movie') {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={[]}
          navIcon={require('image!android_back_white')}
          onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          titleColor="white"
          title={route.title} />
        <EntryDetail
          style={{flex: 1}}
          navigator={navigationOperations}
          movie={route.movie}
          />
      </View>
    );
  }
}

var ReactVideoStreamingPlayer = React.createClass({
  render: function() {
    var initialRoute = {name: 'search'};
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        renderScene={RouteMapper}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  }
});

AppRegistry.registerComponent('ReactVideoStreamingPlayer', () => ReactVideoStreamingPlayer);
