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
import CardWrapper from "../components/CardWrapper";
import BetStats from "../components/BetStats";

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

  const handleOpenBet = React.useCallback(
    (betId) => {
      navigation.navigate("JoinBet", { betId });
    },
    [navigation]
  );

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
      ))}
    </ScrollViewScreen>
  );
};

export default ArtistScreen;
