//@format
//@flow

import React from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-native-components';
import {WebView} from 'react-native-webview';
import {useNavigation} from 'react-navigation-hooks';
import {setToken} from '../util/token';

import keys from "../config/keys"

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
`;

class MyWeb extends React.Component {
  render() {
    return (
      <WebView
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
        source={{
          uri: this.props.uri,
        }}
        onMessage={this.props.onWebViewMessage}
      />
    );
  }
}

const LoginScreen = () => {
  const navigation = useNavigation();

  // called when oauth worked correctly
  const handleWebViewMessage = React.useCallback(
    ({nativeEvent}) => {
      const {type, payload} = JSON.parse(nativeEvent.data);
      switch (type) {
        case 'AUTHENTICATED': {
          setToken(payload.jwt);
          navigation.navigate('Splash');
          break;
        }
        case 'AUTHENTICATION_FAILED':
          navigation.navigate('failedLogin');
          break;
        default:
          return;
      }
    },
    [navigation],
  );

  return (
    <SafeAreaView>
      <Wrapper>
        <MyWeb
          onWebViewMessage={handleWebViewMessage}
          uri={`${keys.apiEndpoint}/auth/spotify`}
        />
      </Wrapper>
    </SafeAreaView>
  );
};

export default LoginScreen;
