//@format
//@flow

import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-native-components";

import ScrollViewScreen from "../components/ScrollViewScreen";
import Button from "../components/Button";
import Loading from "../components/Loading";
import ArtistStats from "../components/ArtistStats";
import ArtistImage from "../components/ArtistImage";
import Graph from "../components/Graph";
import Dialog from "../components/Dialog";
import CreateBet from "../components/CreateBet";

import { useArtist } from "../state/artist";
import { usePortal } from "../components/PortalProvider";

const Row = styled.View`
  flex-direction: row;
  margin: 1rem 0rem;
  justify-content: center;
  align-items: center;
`;

const ArtistScreen = ({ route }) => {
  const navigation = useNavigation();
  const { artistId } = route.params;
  const artist = useArtist(artistId);
  const { renderPortal, closePortal } = usePortal();

  const handleCreateNewBet = React.useCallback(() => {
    renderPortal(
      <Dialog closePortal={closePortal}>
        <CreateBet
          artist={artist}
          navigation={navigation}
          closePortal={closePortal}
        />
      </Dialog>
    );
  }, [artist, closePortal, navigation, renderPortal]);

  const handleOpenArtistBets = React.useCallback(() => {
    console.log("handleOpenArtistBets");
  }, []);

  // const handleOpenBet = React.useCallback(
  //   (betId) => {
  //     navigation.navigate("JoinBet", { betId });
  //   },
  //   [navigation]
  // );

  return !artist ? (
    <Loading />
  ) : (
    <ScrollViewScreen>
      <ArtistImage artist={artist} />
      <ArtistStats
        monthlyListeners={artist.monthlyListeners}
        followers={artist.followers}
        popularity={artist.popularity}
      />
      <Graph data={artist.monthlyListenersHistory} />
      <Row>
        {artist.monthlyListeners ? (
          <Button onPress={handleOpenArtistBets} label="Open bets" />
        ) : null}
        <Button onPress={handleCreateNewBet} label="Create new bet" />
      </Row>

      {/* {artist?.joinableBets?.map((bet) => (
        <CardWrapper key={bet.id}>
          <BetStats {...bet} currentListeners={artist?.monthlyListeners} />
          <Wrapper>
            <Button
              backgroundColor="$background0"
              onPress={() => handleOpenBet(bet.id)}
              label="Join"
            />
          </Wrapper>
        </CardWrapper>
      ))} */}
    </ScrollViewScreen>
  );
};

export default ArtistScreen;
