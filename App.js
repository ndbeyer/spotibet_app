//@format
//@flow

import "react-native-gesture-handler";
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

import Navigator from "./screens/Navigator";
import client from "./util/client";
import ThemeProvider from "./components/ThemeProvider";

if (__DEV__) {
  // enable network inspection in chrome debugger
  // @ts-ignore
  global.XMLHttpRequest =
    global.originalXMLHttpRequest || global.XMLHttpRequest;
  // @ts-ignore
  global.FormData = global.originalFormData || global.FormData;
  // @ts-ignore
  if (window.__FETCH_SUPPORT__) {
    // make RNDebugger work
    // @ts-ignore
    window.__FETCH_SUPPORT__.blob = false;
  } else {
    // @ts-ignore
    global.Blob = global.originalBlob || global.Blob;
    // @ts-ignore
    global.FileReader = global.originalFileReader || global.FileReader;
  }
}

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
