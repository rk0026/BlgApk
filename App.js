import React, { PureComponent } from 'react';
import { Platform, StyleSheet, View, Text, BackHandler, Dimensions, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Orientation from 'react-native-orientation-locker';
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
        Orientation.lockToPortrait();
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
        if (!navState.url.startsWith(config.uri)) {
            Orientation.unlockAllOrientations();
        }
        else {
            Orientation.lockToPortrait();
        }
        this.setState({
            canGoBack: navState.canGoBack,
        });
    }

    onBack() {
        this.webView.current.goBack();
    }

    renderBackButton = () => (
        <View style={styles.topbar}>
            <TouchableOpacity
                disabled={!this.state.canGoBack}
                onPress={this.onBack.bind(this)}
            >
                <Text style={styles.topbarText}>回上頁</Text>
            </TouchableOpacity>
        </View>
    )

    render() {
        const { uri } = config;
        return (
            <View style={styles.container}>
                {this.renderBackButton()}
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
        flex: 1,
        width: window.width < window.height ? window.width : window.height,
        height: window.width < window.height ? window.height : window.width,
    },
    topbar: {
        display: 'flex',
        maxHeight: 20,
        flex: 1,
        backgroundColor: '#000000',
        width: window.width < window.height ? window.width : window.height,
    },
    topbarText: {
        paddingLeft: 5,
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        width: 50,
        backgroundColor: '#000000',
    },
});
