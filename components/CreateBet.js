//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import Button from "../components/Button";
import BetStats from "../components/BetStats";
import DateSlider from "../components/DateSlider";
import ListenersSlider from "../components/ListenersSlider";
import { Paragraph } from "../components/Text";
import { createBet } from "../state/bet";
import delay from "../util/delay";

const Row = styled.View`
  flex-direction: row;
  margin: 1rem 0rem;
  justify-content: center;
  align-items: center;
`;

const SuccessWrapper = styled.View`
  height: 5rem;
  flex-direction: row;
  align-self: stretch;
  justify-content: center;
  align-items: center;
`;

const CreateBet = ({ artist, onCreatedBet, closePortal, renderPortal }) => {
  const [state, setState] = React.useState({
    monthlyListeners: null,
    dateTime: null,
  });
  const [loading, setLoading] = React.useState(false);
  const handleChange = React.useCallback((obj) => {
    setState((before) => ({ ...before, ...obj }));
  }, []);

  const [betId, setBetId] = React.useState(null);

  const handleSubmit = React.useCallback(async () => {
    setLoading(true);
    const { success, id } = await createBet({
      artistId: artist?.id,
      artistName: artist?.name,
      type:
        state.monthlyListeners > artist?.monthlyListeners ? "HIGHER" : "LOWER",
      listeners: state.monthlyListeners,
      endDate: state.dateTime,
      spotifyUrl: artist?.spotifyUrl,
    });
    setLoading(false);

    if (success) {
      setBetId(id);
    } else {
      renderPortal({
        title: "Error",
        description: "An unexpected Error occured. Please try again",
      });
    }
  }, [state.monthlyListeners, state.dateTime, artist, renderPortal]);

  React.useEffect(() => {
    if (betId) {
      (async () => {
        await delay(2000);
        closePortal();
        onCreatedBet(betId);
      })();
    }
  }, [betId, closePortal, onCreatedBet]);

  return !betId ? (
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
          label="Submit"
          disabled={
            state.monthlyListeners === artist?.monthlyListeners ||
            !state.dateTime
          }
        />
      </Row>
    </>
  ) : (
    <SuccessWrapper>
      <Paragraph flex align="center">
        Successfully created bet...
      </Paragraph>
    </SuccessWrapper>
  );
};

export default CreateBet;
