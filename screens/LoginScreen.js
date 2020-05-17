//@format
//@flow

import React from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-native-components";

import WebViewer from "../components/WebViewer";

import { useUser } from "../state/user";
import { setToken } from "../util/token";
import keys from "../config/keys";

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
`;

const LoginScreen = () => {
  const { refetch } = useUser();

  const handleWebViewMessage = React.useCallback(
    ({ nativeEvent }) => {
      const { type, payload } = JSON.parse(nativeEvent.data);
      switch (type) {
        case "AUTHENTICATED": {
          setToken(payload.jwt);
          refetch();
          break;
        }
        case "AUTHENTICATION_FAILED":
          console.log("authentication failed"); // TODO: add dialog
          break;
        default:
          return;
      }
    },
    [refetch]
  );

  return (
    <SafeAreaView>
      <Wrapper>
        <WebViewer
          onWebViewMessage={handleWebViewMessage}
          uri={`${keys.apiEndpoint}/auth/spotify`}
        />
      </Wrapper>
    </SafeAreaView>
  );
};

export default LoginScreen;
