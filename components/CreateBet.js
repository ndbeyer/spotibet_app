//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import Button from "../components/Button";
import BetStats from "../components/BetStats";
import DateSlider from "../components/DateSlider";
import ListenersSlider from "../components/ListenersSlider";
import { createBet } from "../state/bet";

const Row = styled.View`
  flex-direction: row;
  margin: 1rem 0rem;
  justify-content: center;
  align-items: center;
`;

const CreateBet = ({ artist, navigation, closePortal }) => {
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
      {artist.monthlyListeners === state.monthlyListeners ? null : (
        <BetStats
          currentListeners={artist.monthlyListeners}
          type={
            state.monthlyListeners > artist.monthlyListeners
              ? "HIGHER"
              : "LOWER"
          }
          predictedListeners={state.monthlyListeners}
          endDate={state.dateTime}
          presentationType="CREATE"
          nBarHeightMax={10}
          nBarWidth={10}
        />
      )}

      <ListenersSlider
        onChange={handleChange}
        monthlyListeners={artist?.monthlyListeners}
      />
      <DateSlider initialValue={0} onChange={handleChange} />

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

export default CreateBet;
