import React, { PureComponent } from 'react';
import { Platform, StyleSheet, View, BackHandler, Dimensions, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import config from './config';

const window = Dimensions.get('window');

export default class App extends PureComponent {
  webView = {
      canGoBack: false,
      ref: null,
  }


  componentDidMount() {
      if (Platform.OS === 'android') {
          BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
      }
  }

  componentWillUnmount() {
      if (Platform.OS === 'android') {
          BackHandler.removeEventListener('hardwareBackPress');
      }
  }

  onAndroidBackPress = () => {
      if (this.webView.canGoBack) {
          this.webView.ref.goBack();
          return true;
      }
      return true;
  }
  // openExternalLink(req) {
  //   // const isLocal = req.url.indexOf(config.uri) !== -1;
  //   // if (isLocal) {
  //   //   return true;
  //   // } else {
  //     Linking.openURL(req.url);
  //     return false;
  //   // }
  // }

  render() {
      const { uri } = config;
      return (
          <View style={styles.container}>
              <WebView
                  source={{ uri }}
                  style={styles.webView}
                  ref={(webView) => {
                      this.webView.ref = webView;
                  }}
                  useWebKit={false}
                  onNavigationStateChange={(navState) => {
                      this.webView.canGoBack = navState.canGoBack;
                      // if (navState.url.indexOf(uri) === -1) {
                      //     this.webView.ref.stopLoading();
                      //     Linking.openURL(navState.url);
                      // }
                  }}
                  onError={console.error.bind(console, 'error')}
                  javaScriptEnabled
                  domStorageEnabled
                  allowUniversalAccessFromFileURLs
                  // onShouldStartLoadWithRequest={request => !request.url.startsWith(config.uri)}
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
        overflow: 'hidden',
    },
    webView: {
        width: window.width,
        height: window.height,
    },
});
