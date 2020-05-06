//@format
//@flow

import React from 'react';
import styled, { withTheme } from 'styled-native-components';
// import {useQuery} from '@apollo/react-hooks';
// import {gql} from 'apollo-boost';

const Bar = styled.View`
  width: 100%;
  height: 100%;
  border: 3px solid black;
  background-color: green;
`;

class AppHeader extends React.Component {

  // static navigationOptions = {
  //   title: 'Home',
  //   headerStyle: {
  //     backgroundColor: '#f4511e',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //   },
  // };

  render() {

    console.log("this.props",this.props)

    return <Bar />;
  }
}

export default withTheme(AppHeader);
