import React, { PureComponent } from 'react';
import { Platform, StyleSheet, View, BackHandler, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
// import Orientation from 'react-native-orientation-locker';
import { config } from './config';

const window = Dimensions.get('window');

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.webView = React.createRef();
        this.state = {
            canGoBack: false,
        };
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
        }
        // Orientation.lockToPortrait();
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }

    onAndroidBackPress = () => {
        if (this.state.canGoBack) {
            this.webView.current.goBack();
            return true;
        }
        return true;
    }

    onNavigationStateChange = (navState) => {
        // if (!navState.url.startsWith(config.uri)) {
        //     Orientation.unlockAllOrientations();
        // }
        // else {
        //     Orientation.lockToPortrait();
        // }
        this.setState({
            canGoBack: navState.canGoBack,
        });
    }

    render() {
        const { uri } = config;
        return (
            <View style={styles.container}>
                <WebView
                    source={{ uri }}
                    style={styles.webView}
                    ref={this.webView}
                    useWebKit={false}
                    onNavigationStateChange={this.onNavigationStateChange}
                    onError={console.error.bind(console, 'error')}
                    javaScriptEnabled
                    domStorageEnabled
                    allowUniversalAccessFromFileURLs
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
        width: window.width < window.height ? window.width : window.height,
        height: window.width < window.height ? window.height : window.width,
    },
});
