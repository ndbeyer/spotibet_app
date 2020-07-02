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

import { useArtist } from "../state/artist";
import { createBet } from "../state/bet";

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
    listeners: null,
    endDate: null,
  });

  const [loading, setLoading] = React.useState(false);

  const handleChange = React.useCallback((obj) => {
    setState((before) => ({ ...before, ...obj }));
  }, []);

  const handleSubmit = React.useCallback(async () => {
    if (state.listeners !== artist?.monthlyListeners && state.endDate) {
      setLoading(true);
      const { success, id } = await createBet({
        artistId: artist?.id,
        artistName: artist?.name,
        type: state.listeners > artist?.monthlyListeners ? "HIGHER" : "LOWER",
        listeners: state.listeners,
        endDate: state.endDate,
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
  }, [state.listeners, state.endDate, artist, navigation]);

  return !artist ? (
    <Loading />
  ) : (
    <Screen>
      <ArtistImage artist={artist} />

      <StatsRow
        monthlyListeners={artist.monthlyListeners}
        followers={artist.followers}
        popularity={artist.popularity}
      />
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
                state.listeners === artist?.monthlyListeners || !state.endDate
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
