//@format
//@flow

import React from 'react';
import styled from 'styled-native-components';
import {Dimensions, StatusBar} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import LogoutButton from "./LogoutButton"

const Wrapper = styled.View`
  height: 100%;
  width: ${p => p.width}px;
  background-color: $background;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: ${p => p.justify || 'center'};
  align-items: center;
  margin-left: 3rem;
  margin-right: 3rem;
`;

const Text = styled.Text`
  font-size: 4rem;
  color: $main;
`;

const Header = ({navigation}) => {

  const {loading, data, error} = useQuery(
    gql`
      query header {
        currentUser {
          id
          spotify_profile_id
          money
        }
      }
    `,
  );

  if (error) {
    console.log('Header apollo error:', error);
  }

  const {currentUser} = data || {};
  const {money} = currentUser || {};
  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  return (
    <Wrapper width={SCREEN_WIDTH}>
      <StatusBar barStyle="dark-content" />
      {navigation.state.routeName === 'Playlists' ? (
          <TextWrapper justify="flex-start">
            <LogoutButton/>
          </TextWrapper>
      ) : (
        <TextWrapper />
      )}
      <TextWrapper>
        <Text>{navigation.state.routeName}</Text>
      </TextWrapper>
      <TextWrapper justify="flex-end">
        <Text>Money: {money}</Text>
      </TextWrapper>
    </Wrapper>
  );
};

export default Header;
