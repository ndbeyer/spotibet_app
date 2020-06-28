//@format
//@flow

import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import { Paragraph } from "../components/Text";

const FailedLogin = () => {
  const navigation = useNavigation();

  const handleRetry = React.useCallback(() => {
    navigation.navigate("loggedOut");
  }, [navigation]);

  return (
    <SafeAreaView>
      <Paragraph>FailedLogin</Paragraph>
      <Button onPress={handleRetry} label="Retry" />
    </SafeAreaView>
  );
};

export default FailedLogin;
