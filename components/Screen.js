import React, { ReactNode } from "react";
import styled, { useStyle } from "styled-native-components";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
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

const Wrapper = ({
  type,
  style,
  children,
  ...rest
}: {
  type: "SCROLL" | "VIEW" | "KEYBOARDAVOIDING",
  style?: any,
  children: ReactNode,
}) =>
  type === "VIEW" ? (
    <View style={style} {...rest}>
      {children}
    </View>
  ) : type === "SCROLL" ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style}
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
  const fallbackStyle = useStyle(`
		width: 100%;
		min-height: 100%;
		align-items: center;
		padding: 2rem 0rem;
    background-color: transparent;
    `);

  const styles = React.useMemo(
    () => ({
      ...fallbackStyle,
      ...style,
    }),
    [fallbackStyle, style]
  );

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Background />
        {renderHeaderContent ? renderHeaderContent() : null}

        <Wrapper type={type} style={styles}>
          {loading ? <Loading /> : children}
        </Wrapper>
      </SafeAreaView>
    </>
  );
};

export default Screen;
