//@format
//@flow

import React from "react";
import { SafeAreaView } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useNavigation } from "react-navigation-hooks";

import Loading from "../components/Loading";
import Card from "../components/Card";
import Screen from "../components/Screen";
import Scroll from "../components/Scroll";

const ArtistsScreen = () => {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(
    gql`
      query artistsOfPlaylist($playlistId: ID!) {
        artistsOfPlaylist(playlistId: $playlistId) {
          id
          name
          image
        }
      }
    `,
    {
      variables: {
        playlistId: navigation.state.params.playlistId,
      },
    }
  );

  const handlePress = React.useCallback(
    (artistId) => {
      navigation.navigate("Bet", { artistId });
    },
    [navigation]
  );

  return (
    <SafeAreaView>
      <Screen>
        {loading ? (
          <Loading />
        ) : (
          <Scroll>
            {data && data.artistsOfPlaylist
              ? data.artistsOfPlaylist.map(({ id, name, image }) => (
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
    </SafeAreaView>
  );
};

export default ArtistsScreen;
