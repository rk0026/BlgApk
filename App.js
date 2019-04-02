import React, {PureComponent} from 'react';
import {Platform, StyleSheet, View, BackHandler, Dimensions} from 'react-native';
import { WebView } from "react-native-webview";
import config from './config';

const window = Dimensions.get('window');

export default class App extends PureComponent {
  webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: config.uri}}
          style={styles.webView}
          ref={(webView) => { this.webView.ref = webView; }}
          onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
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
