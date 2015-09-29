'use strict';

var React = require('react-native');

var {
  WebView
} = React;


var EntryDetail = React.createClass({
  render: function(){
    var html = '<!DOCTYPE html><html><head><link href="//vjs.zencdn.net/4.6/video-js.css" rel="stylesheet"><script src="//vjs.zencdn.net/4.6/video.js"></script><style>.video-js {position: absolute; width: 100%; height: 100%; top: 0x; left: 0px;}</style></head><body><div><video class="video-js vjs-default-skin" controls preload="auto" poster="' + this.props.thumbnail_url + '"><source src="' + this.props.video_url + '" type="application/x-mpegURL" /></video></div></body></html>';
    return(
      <WebView
        html={html}
        />
    );
  }
});

module.exports = EntryDetail;
