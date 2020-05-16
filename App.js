//@format
//@flow

// external
import "react-native-gesture-handler";
import client from "./util/client";
import React from "react";
import { ThemeProvider } from "styled-native-components";
import { ApolloProvider } from "@apollo/react-hooks";

// componennts
import Navigator from "./screens/Navigator";

const theme = {
  rem: 4,
  colors: {
    main: "black",
    main2: "blue",
    main3: "green",
    second: "grey",
    neutral: "grey",
    overlayText: "white",
    background: "white",
    accent: "#4169E1", // #4169E1
  },
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
