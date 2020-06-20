//@format
//@flow

import React from "react";

import Button from "../components/Button";

import { login } from "../state/auth";

const LoginScreen = () => {
  return <Button onPress={login} label="Login" />;
};

export default LoginScreen;
