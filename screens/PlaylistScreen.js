//@format
//@flow

import React from 'react';
import {SafeAreaView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {useNavigation} from 'react-navigation-hooks';

import Loading from '../components/Loading';
import Card from '../components/Card';
import Screen from '../components/Screen';
import Scroll from '../components/Scroll';

const PlaylistScreen = () => {
  const navigation = useNavigation();

  const {loading, error, data} = useQuery(
    gql`
      query playlists {
        playlists {
          id
          name
          image
        }
      }
    `,
  );

  console.log('Playlist: data', data, '\n loading', loading, '\n error', error);

  const handlePress = React.useCallback(
    playlistId => {
      navigation.navigate('Artists', {playlistId});
    },
    [navigation],
  );

  return (
    <Screen>
      {loading ? (
        <Loading />
      ) : (
        <Scroll>
          {data && data.playlists
            ? data.playlists.map(({id, name, image}) => (
                <Card
                  key={id}
                  id={id}
                  name={name}
                  image={image}
                  onPress={() => handlePress(id)}
                />
              ))
            : null}
        </Scroll>
      )}
    </Screen>
  );
};

export default PlaylistScreen;
