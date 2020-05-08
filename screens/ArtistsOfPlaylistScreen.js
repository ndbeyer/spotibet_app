//@format
//@flow

import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";

import Loading from "../components/Loading";
import Card from "../components/Card";
import Screen from "../components/Screen";
import Scroll from "../components/Scroll";

import { useArtistsOfPlaylist } from "../state/artist";

const ArtistsOfPlaylistScreen = () => {
  const navigation = useNavigation();
  const playlistId = useNavigationParam("playlistId");
  const artistsOfPlaylist = useArtistsOfPlaylist(playlistId);

  const handlePress = React.useCallback(
    (artistId) => {
      navigation.navigate("Bet", { artistId });
    },
    [navigation]
  );

  return (
    <SafeAreaView>
      <Screen>
        {!artistsOfPlaylist ? (
          <Loading />
        ) : (
          <Scroll>
            {artistsOfPlaylist.length
              ? artistsOfPlaylist.map(({ id, name, image }) => (
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

export default ArtistsOfPlaylistScreen;
