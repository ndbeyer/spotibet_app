//@format
//@flow

import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-native-components";

import ScrollViewScreen from "../components/ScrollViewScreen";
import Button from "../components/Button";
import GeneralSlider from "../components/GeneralSlider";
import Loading from "../components/Loading";
import ArtistStats from "../components/ArtistStats";
import ArtistImage from "../components/ArtistImage";
import Graph from "../components/Graph";
import Dialog from "../components/Dialog";

import { useArtist } from "../state/artist";
import { createBet } from "../state/bet";
import { usePortal } from "../components/PortalProvider";

const Row = styled.View`
  flex-direction: row;
  margin: 1rem 0rem;
  justify-content: center;
  align-items: center;
`;

const BetPortal = ({ artist, navigation, closePortal }) => {
  const [state, setState] = React.useState({
    monthlyListeners: null,
    dateTime: null,
  });
  const [loading, setLoading] = React.useState(false);
  const handleChange = React.useCallback((obj) => {
    setState((before) => ({ ...before, ...obj }));
  }, []);

  const handleSubmit = React.useCallback(async () => {
    if (state.monthlyListeners !== artist?.monthlyListeners && state.dateTime) {
      setLoading(true);
      const { success, id } = await createBet({
        artistId: artist?.id,
        artistName: artist?.name,
        type:
          state.monthlyListeners > artist?.monthlyListeners
            ? "HIGHER"
            : "LOWER",
        listeners: state.monthlyListeners,
        endDate: state.dateTime,
        spotifyUrl: artist?.spotifyUrl,
      });
      setLoading(false);
      closePortal();
      if (success) {
        navigation.navigate("JoinBet", {
          betId: id,
        });
      } else {
        console.log("createBet error"); // TODO: dialog
      }
    } else {
      console.log("Error, inputs are missing"); // TODO: dialog
    }
  }, [state.monthlyListeners, state.dateTime, artist, navigation, closePortal]);

  return (
    <>
      <GeneralSlider
        type="LISTENERS"
        initialValue={0}
        step={1}
        minSliderVal={-100}
        maxSliderVal={100}
        onChange={handleChange}
        monthlyListeners={artist?.monthlyListeners}
      />
      <GeneralSlider
        type="DATE"
        initialValue={0}
        step={1}
        minSliderVal={0}
        maxSliderVal={100}
        onChange={handleChange}
      />
      <Row>
        <Button
          onPress={closePortal}
          label="Cancel"
          backgroundColor="$background0"
        />
        <Button
          loading={loading}
          onPress={handleSubmit}
          label="Sumbit"
          disabled={
            state.monthlyListeners === artist?.monthlyListeners ||
            !state.dateTime
          }
        />
      </Row>
    </>
  );
};

const ArtistScreen = ({ route }) => {
  const navigation = useNavigation();
  const { artistId } = route.params;
  const artist = useArtist(artistId);
  const { renderPortal, closePortal } = usePortal();

  const handleCreateNewBet = React.useCallback(() => {
    if (artist.monthlyListeners) {
      renderPortal(
        <Dialog closePortal={closePortal}>
          <BetPortal
            artist={artist}
            navigation={navigation}
            closePortal={closePortal}
          />
        </Dialog>
      );
    }
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
        <Button onPress={handleOpenArtistBets} label="Open bets" />
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
