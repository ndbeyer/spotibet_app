//@format
//@flow

import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled, {
  useWindowDimensions,
  useTheme,
} from "styled-native-components";

import Screen from "../components/Screen";
import Button from "../components/Button";
import GeneralSlider from "../components/GeneralSlider";
import Image from "../components/Image";
import OpenBet from "../components/OpenBet";
import Loading from "../components/Loading";
import Gradient from "../components/Gradient";
import { Label, Heading, Paragraph } from "../components/Text";

import { useArtist } from "../state/artist";
import { createBet } from "../state/bet";

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
`;

const StyledScreen = styled(Screen)`
  padding: 1rem;
`;

const ArtistName = styled(Heading)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ImageWrapper = styled.View`
  height: ${(p) => p.height}px;
  width: ${(p) => p.width}px;
`;

const StyledGradient = styled(Gradient).attrs((p) => ({
  opacities: [0.1, 0.2, 0.4],
  colors: [
    p.theme.colors.background0,
    p.theme.colors.background0,
    p.theme.colors.neutral2,
  ],
}))``;

const Row = styled.View`
  flex-direction: row;
`;

const StatsWrapper = styled.View`
  width: 100%;
  margin: 0.5rem 0rem 2rem;
`;

const StatsRow = ({ monthlyListeners, followers, popularity }) => {
  return (
    <StatsWrapper>
      <Row>
        {["Followers", "Listeners", "Popularity"].map((label) => (
          <Label
            light
            margin="1rem 1rem 0rem"
            flex
            color="$neutral3"
            key={label}
          >
            {label}
          </Label>
        ))}
      </Row>
      <Row>
        {[followers, monthlyListeners, popularity].map((label) => (
          <Paragraph margin="0rem 1rem" flex key={label}>
            {label}
          </Paragraph>
        ))}
      </Row>
    </StatsWrapper>
  );
};

const ArtistScreen = ({ route }) => {
  const theme = useTheme();
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

  const { width } = useWindowDimensions();
  const widthRem = width / theme.rem + "rem";

  console.log({ artist });
  return !artist ? (
    <Loading />
  ) : (
    <StyledScreen loading={!artist}>
      <ImageWrapper width={widthRem} height={widthRem}>
        <Image width="100%" height="100%" source={artist.image} />
        <StyledGradient />
        <ArtistName size="l" margin="1rem 1.5rem" color="$background0">
          {artist.name}
        </ArtistName>
      </ImageWrapper>
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
    </StyledScreen>
  );
};

export default ArtistScreen;
