//@format
//@flow

import "react-native-gesture-handler";
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

import Navigator from "./screens/Navigator";
import client from "./util/client";
import ThemeProvider from "./components/ThemeProvider";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
