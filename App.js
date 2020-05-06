//@format
//@flow

// external
import client from './util/client';
import React from 'react';
import {ThemeProvider} from 'styled-native-components';
import {ApolloProvider} from '@apollo/react-hooks';

// componennts
import Navigator from './screens/Navigator';
import NavigationService from './util/NavigationService';

const theme = {
  rem: 4,
  colors: {
    main: 'black',
    main2: '#001708',
    main3: '#002e0f',
    second: 'grey',
    background: 'white',
    accent: '#4169E1', // #4169E1
  },
  elevation: value => ({
    shadowColor: 'black',
    shadowOffset: {width: 0, height: value},
    shadowRadius: value * 2.5,
    shadowOpacity: 0.3,
    elevation: value,
    zIndex: value,
  }),
};

const App = () => {
  

  const setRef = React.useCallback(navigatorRef => {
    NavigationService.setTopLevelNavigator(navigatorRef);
  }, []);

  const screenProps = React.useMemo(() => ({theme}), []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Navigator ref={setRef} screenProps={screenProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
