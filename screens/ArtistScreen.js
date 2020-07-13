//@format
//@flow

import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-native-components";

import Screen from "../components/Screen";
import Button from "../components/Button";
import GeneralSlider from "../components/GeneralSlider";
import OpenBet from "../components/OpenBet";
import Loading from "../components/Loading";
import StatsRow from "../components/StatsRow";
import ArtistImage from "../components/ArtistImage";
import Graph from "../components/Graph";
import Dialog from "../components/Dialog";

import { useArtist } from "../state/artist";
import { createBet } from "../state/bet";
import { usePortal } from "../components/PortalProvider";

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
`;

const ArtistScreen = ({ route }) => {
  const navigation = useNavigation();
  const { artistId } = route.params;
  const artist = useArtist(artistId);

  const [state, setState] = React.useState({
    monthlyListeners: null,
    dateTime: null,
  });

  const { renderPortal, closePortal } = usePortal();

  // TODO: test only
  const handleOpenDialog = React.useCallback(() => {
    renderPortal(
      <Dialog
        closePortal={closePortal}
        tile="Error"
        description="Error during login"
        buttons={[
          {
            label: "ok",
            onPress: () => console.log("Pressed"),
          },
        ]}
      />
    );
  }, [closePortal, renderPortal]);

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
  }, [state.monthlyListeners, state.dateTime, artist, navigation]);

  return !artist ? (
    <Loading />
  ) : (
    <Screen>
      <ArtistImage artist={artist} />
      {/* TODO: test only */}
      <Button onPress={handleOpenDialog} label="Open Dialog" />
      <StatsRow
        monthlyListeners={artist.monthlyListeners}
        followers={artist.followers}
        popularity={artist.popularity}
      />
      <Graph data={artist.monthlyListenersHistory} />
      {artist.monthlyListeners ? (
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
          <Wrapper>
            <Button
              loading={loading}
              onPress={handleSubmit}
              label="Sumbit"
              disabled={
                state.monthlyListeners === artist?.monthlyListeners ||
                !state.dateTime
              }
            />
          </Wrapper>
        </>
      ) : null}

      {artist?.joinableBets?.map((bet) => (
        <OpenBet key={bet.id} {...bet} />
      ))}
    </Screen>
  );
};

export default ArtistScreen;
