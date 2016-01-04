'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  WebView
} = React;

var WEBVIEW_REF = 'webview';

var EntryDetail = React.createClass({

  getInitialState: function() {
    return {
      loading: true,
      scalesPageToFit: true,
    }
  },

  render: function(){
    var html = '<!DOCTYPE html><html><head><style>video {width: 100%;}</style></head><body><video controls poster="' + this.props.movie.thumbnail_url + '"><source src="' + this.props.movie.video_url + '"></video></body></html>';
    return(
      <View style={{flex: 1}}>
        <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          html={html}
          javaScriptEnabledAndroid={true}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          startInLoadingState={true}
          scalePageToFit={this.state.scalesPageToFit}
          />
      </View>
    );
  },

  onShouldStartLoadWithRequest: function(event) {
    // Implement any custom loading logic here, don't forget to return!
    return true;
  }
});

var styles = StyleSheet.create({
});

module.exports = EntryDetail;
