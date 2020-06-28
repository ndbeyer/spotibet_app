//@format
//@flow

// external
import "react-native-gesture-handler";
import client from "./util/client";
import React from "react";
import { ThemeProvider } from "styled-native-components";
import { ApolloProvider } from "@apollo/react-hooks";

import { colorDefs } from "./util/colors";

// componennts
import Navigator from "./screens/Navigator";

const theme = {
  rem: 4,
  colors: colorDefs({ accentColor: "#34eb46" }),
  elevation: (value) => ({
    shadowColor: "black",
    shadowOffset: { width: 0, height: value },
    shadowRadius: value * 2.5,
    shadowOpacity: 0.3,
    elevation: value,
    zIndex: value,
  }),
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
