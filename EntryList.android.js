'use strict';

var React = require('react-native');
var ProgressBar = require('ProgressBarAndroid');
var SearchBar = require('./SearchBar.android.js');

var {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
} = React;

var API_URL = require('./env.js').API_URL;

var EntryList = React.createClass({
  getInitialState: function(){
    return(
      {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 != row2
        }),
        isLoaded: false,
        isSearching: false
      }
    );
  },
  fetchData: function(queryWord){
    var url = API_URL;
    if (queryWord) {
      url += "?q=" + queryWord;
    }
    console.log("url=" + url);

    fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        isLoaded: true,
        isSearching: false
      });
    })
    .done();
  },
  componentDidMount: function(){
    this.fetchData();
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
    this.props.navigator.push({
      name: 'movie',
      movie: { video_url: entry.hls_url, thumbnail_url: entry.thumbnail_url, width: entry.width, height: entry.height },
      title: entry.name
    })
  },
  viewLoadingData: function(){
    return(
      <View style={{flex: 1}}>
        <SearchBar
          onFocus={() => 
            this.refs.listview && this.refs.listview.getScrollResponder().scrollTo(0, 0)}
          />
        <View style={styles.activityIndicatorContainer}>
          <View style={styles.activityIndicator}>
            <ProgressBar />
            <View>
              <Text style={styles.loadingMessage}>Please wait a second ...</Text>
            </View>
          </View>
        </View>
      </View>
    );
  },

  onSearchChange: function(event: Object) {
    var query = event.nativeEvent.text.toLowerCase();
    console.log("query=" + query);

    if (query === '') {
      this.setState({isSearching: false});
      this.fetchData();
    } else {
      this.setState({isSearching: true});
      this.fetchData(query);
    }
  },

  render: function() {
    if (this.state.isLoaded) {
      return (
        <View style={{flex: 1}}>
          <SearchBar
            onSearchChange={this.onSearchChange}
            isLoading={this.state.isSearching}
            onFocus={() => 
              this.refs.listview && this.refs.listview.getScrollResponder().scrollTo(0, 0)}
            />
          <ListView
            style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={this.renderEntry}
            ref="listview"
            />
        </View>
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
  activityIndicatorContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  activityIndicator: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  loadingMessage: {
    flex: 1,
    fontSize: 20,
    color: '#656565'
  }
});

module.exports = EntryList;
