//@format
//@flow

import React from "react";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";

import Loading from "../components/Loading";
import Screen from "../components/Screen";
import Scroll from "../components/Scroll";
import Button from "../components/Button";
import GeneralSlider from "../components/GeneralSlider";
import CardWrapper from "../components/CardWrapper";
import Row from "../components/Row";
import ArtistRow from "../components/ArtistRow";
import OpenBet from "../components/OpenBet";

import { useArtist } from "../state/artist";
import { createBet } from "../state/bet";

const ArtistScreen = () => {
  console.log("ArtistScreen");
  const navigation = useNavigation();
  const artistId = useNavigationParam("artistId");
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

  return (
    <Screen>
      {!artist ? (
        <Loading />
      ) : (
        <Scroll>
          <CardWrapper key={artist.id}>
            <ArtistRow {...artist} />
            <>
              <GeneralSlider
                type="LISTENERS"
                initialValue={0}
                step={1}
                minSliderVal={-100}
                maxSliderVal={100}
                onChange={handleChange}
                monthlyListeners={artist.monthlyListeners}
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
                  loading={loading}
                  onPress={handleSubmit}
                  label="Sumbit"
                  disabled={
                    state.listeners === artist.monthlyListeners ||
                    !state.endDate
                  }
                />
              </Row>
            </>
          </CardWrapper>
          {artist.joinableBets?.length
            ? artist.joinableBets.map((bet) => (
                <OpenBet key={bet.id} {...bet} />
              ))
            : null}
        </Scroll>
      )}
    </Screen>
  );
};

export default ArtistScreen;
