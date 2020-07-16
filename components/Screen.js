import React, { ReactNode } from "react";
import styled, { useStyle } from "styled-native-components";

import {
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import Loading from "./Loading";

const Background = styled.View`
  width: 100%;
  height: 100vh;
  background-color: $background0;
  position: absolute;
`;

const StyledView = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
  contentContainer {
    align-items: center;
    width: 100%;
  }
`;

const Wrapper = ({
  type,
  style,
  children,
  ...rest
}: {
  type: "SCROLL" | "VIEW" | "KEYBOARDAVOIDING",
  style?: any,
  children: ReactNode,
}) => {
  return type === "VIEW" ? (
    <StyledView style={style} {...rest}>
      {children}
    </StyledView>
  ) : type === "SCROLL" ? (
    <StyledScrollView
      showsVerticalScrollIndicator={false}
      style={style}
      {...rest}
    >
      {children}
    </StyledScrollView>
  ) : type === "KEYBOARDAVOIDING" ? (
    <KeyboardAvoidingView
      style={style}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      {...rest}
    >
      {children}
    </KeyboardAvoidingView>
  ) : null;
};

const Screen = ({
  renderHeaderContent,
  children,
  type = "SCROLL",
  loading,
  style,
}: {
  renderHeaderContent?: () => ReactNode,
  children?: ReactNode | ReactNode[],
  type: "SCROLL" | "VIEW" | "KEYBOARDAVOIDING",
  loading: boolean,
  style: any,
}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
          // borderStyle: "solid",
          // borderWidth: 5,
          // borderColor: "blue",
        }}
      >
        <Background />
        {renderHeaderContent ? renderHeaderContent() : null}
        <Wrapper type={type} style={style}>
          {loading ? <Loading /> : children}
        </Wrapper>
      </SafeAreaView>
    </>
  );
};

export default Screen;
