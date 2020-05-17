//@format
//@flow

import React from "react";
import { WebView } from "react-native-webview";

class WebViewer extends React.Component {
  render() {
    return (
      <WebView
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
        source={{
          uri: this.props.uri,
        }}
        onMessage={this.props.onWebViewMessage}
        {...this.props}
      />
    );
  }
}

export default WebViewer;
