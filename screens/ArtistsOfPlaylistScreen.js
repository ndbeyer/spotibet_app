//@format
//@flow

import React from "react";
import { useNavigation } from "@react-navigation/native";

import Loading from "../components/Loading";
import Screen from "../components/Screen";
import Scroll from "../components/Scroll";
import { Card } from "../screens/PlaylistScreen";

import { useArtistsOfPlaylist } from "../state/artist";

const ArtistsOfPlaylistScreen = ({ route }) => {
  const { playlistId } = route.params;
  const navigation = useNavigation();
  const artistsOfPlaylist = useArtistsOfPlaylist(playlistId);

  const handlePress = React.useCallback(
    (artistId) => {
      navigation.navigate("Artist", { artistId });
    },
    [navigation]
  );

  return (
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
  );
};

export default ArtistsOfPlaylistScreen;
