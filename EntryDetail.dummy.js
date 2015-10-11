'use strict';

var React = require('react-native');
var {
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var EntryDetail = React.createClass({
  _handlePress: function() {
    this.props.navigator.pop();
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>WebView Mock</Text>
        <Text>WebView is not supported on Android currently.</Text>
        <TouchableHighlight onPress={this._handlePress} style={styles.button}>
          <Text style={styles.buttonText}>back</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    marginBottom: 15
  },
  button: {
    height: 36,
    backgroundColor: '#6495ED',
    borderRadius: 8,
    justifyContent: 'center',
    padding: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
});

module.exports = EntryDetail;

