'use strict';

var React = require('react-native');
var EntryDetail = require('./EntryDetail.js');

var {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var API_URL = require('./env.js').API_URL;

var EntryList = React.createClass({
  getInitialState: function(){
    return(
      {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 != row2
        }),
        isLoaded: false
      }
    );
  },
  fetchData: function(){
    fetch(API_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        isLoaded: true
      });
    })
    .done();
  },
  componentDidMount: function(){
    if (typeof this.props.entries !== 'undefined') {
      console.log("I'm in search condition");
      this.setState(
        {
          dataSource: this.state.dataSource.cloneWithRows(this.props.entries),
          isLoaded: true
        }
      );
    } else {
      this.fetchData();
    }
  },
  renderEntry: function(entry) {
    return(
      <TouchableHighlight onPress={() => this.onPressed(entry)}>
        <View>
          <View style={styles.container}>
            <Image
              source={{uri: entry.thumbnail_url}}
              style={styles.thumbnail} />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{entry.name}</Text>
              <Text style={styles.created_at}>{entry.created_at}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  },
  onPressed: function(entry) {
    console.log(entry.hls_url);
    this.props.navigator.push({
      title: entry.name,
      component: EntryDetail,
      passProps: { video_url: entry.hls_url, thumbnail_url: entry.thumbnail_url }
    })
  },
  viewLoadingData: function(){
    return(
      <View style={styles.activityIndicator}>
        <ActivityIndicatorIOS
          animating={1}
          size={'large'}
          />
        <View>
          <Text style={styles.loadingMessage}>Please wait a second ...</Text>
        </View>
      </View>
    );
  },
  render: function() {
    if (this.state.isLoaded) {
      return (
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderEntry}
          />
      );
    } else {
      return(
        this.viewLoadingData()
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8
  },
  created_at: {
    color: '#656565'
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  listView: {
    backgroundColor: '#F5FCFF'
  },
  activityIndicator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingMessage: {
    flex: 1,
    fontSize: 20,
    color: '#656565'
  }
});

module.exports = EntryList;
