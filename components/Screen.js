import React, { ReactNode } from "react";
import styled, { useStyle } from "styled-native-components";
import { useHeaderHeight } from "@react-navigation/stack";

import {
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

const PositionWrapper = styled.View`
  border: 1px solid blue;
  top: ${(p) => p.top}px;
  left: 0;
  position: absolute;
  width: 5rem;
  height: 5rem;
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
  // this is a workaround because contentContainerStyle { padding: ... } is not supported by styled-native-components
  const basicContentContainerStyle = useStyle(`
    align-items: center;
    min-height: 100%;
    width: 100%;
   
  `);

  const contentContainerStyle = React.useMemo(
    () => ({
      ...basicContentContainerStyle,
      ...style,
    }),
    [basicContentContainerStyle, style]
  );

  return type === "VIEW" ? (
    <StyledView style={style} {...rest}>
      {children}
    </StyledView>
  ) : type === "SCROLL" ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      {...rest}
    >
      {children}
    </ScrollView>
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
  const headerHeight = useHeaderHeight();
  console.log({ headerHeight });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
          // borderStyle: "solid",
          // borderWidth: 5,
          // borderColor: "red",
        }}
      >
        <Background />
        {renderHeaderContent ? renderHeaderContent() : null}
        <Wrapper type={type} style={style}>
          {loading ? <Loading /> : children}
        </Wrapper>
        {/* <PositionWrapper top={headerHeight} /> */}
      </SafeAreaView>
    </>
  );
};

export default Screen;
