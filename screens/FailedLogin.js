//@format
//@flow

import React from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-native-components";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

const Text = styled.Text`
  color: main;
`;

const FailedLogin = () => {
  const navigation = useNavigation();

  const handleRetry = React.useCallback(() => {
    navigation.navigate("loggedOut");
  }, [navigation]);

  return (
    <SafeAreaView>
      <Text>FailedLogin</Text>
      <Button onPress={handleRetry} label="Retry" />
    </SafeAreaView>
  );
};

export default FailedLogin;
