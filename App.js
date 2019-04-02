import React, {PureComponent} from 'react';
import {Platform, StyleSheet, View, Text, Dimensions} from 'react-native';
import { WebView } from "react-native-webview";
import config from './config';

const window = Dimensions.get('window');

export default class App extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: config.uri}}
          style={styles.webView}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow:'hidden',
  },
  webView: {
    width: window.width,
    height: window.height,
  }
});
