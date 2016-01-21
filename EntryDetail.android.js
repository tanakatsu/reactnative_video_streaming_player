'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  StyleSheet,
  View,
  WebView,
  Text
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
    var aspect = this.props.movie.width / this.props.movie.height;
    var { width, height, scale } = Dimensions.get('window');
    var toolbar_offset = 100;
    var width_percent = aspect >= 1 ? 100 : 100 * aspect * (height - toolbar_offset) / width; 
    var style = 'html { height: 100% } body { height: 100%; margin: 5} .player { text-align:center; height: 100%; } .content { width: ' + width_percent + '%; }';
    var url = this.props.movie.video_url + '.m3u8';
    var html = '<!DOCTYPE html><html><head><style>' + style + '</style></head><body><div class="player"><video controls class="content" poster="' + this.props.movie.thumbnail_url + '"><source src="' + url + '"></video></div></body></html>';
    // Emulatorだと正常に再生されない..
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
