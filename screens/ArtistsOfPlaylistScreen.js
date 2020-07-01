//@format
//@flow

import React from "react";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
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
    <Screen loading={!artistsOfPlaylist}>
      {artistsOfPlaylist?.map(({ id, name, image }) => (
        <Card
          key={id}
          id={id}
          name={name}
          image={image}
          onPress={() => handlePress(id)}
        />
      ))}
    </Screen>
  );
};

export default ArtistsOfPlaylistScreen;
