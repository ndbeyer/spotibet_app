//@format
//@flow

import React from "react";
import styled, { useTheme } from "styled-native-components";
import { Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import Button from "../components/Button";
import GeneralSlider from "../components/GeneralSlider";
import { Label } from "../components/Text";
import BetStatsRow from "../components/BetStatsRow";
import ArtistRow from "../components/ArtistRow";
import Loading from "../components/Loading";

import { useBet, joinBet } from "../state/bet";
import { useUser } from "../state/user";

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

const JoinBetScreen = ({ route }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { betId } = route.params;
  const bet = useBet(betId);
  const { currentUser } = useUser();

  const [state, setState] = React.useState({
    amount: null,
    support: true,
  });

  const [loading, setLoading] = React.useState(false);

  const handleChange = React.useCallback((obj) => {
    setState((before) => ({ ...before, ...obj }));
  }, []);

  const handleSubmit = React.useCallback(async () => {
    if (state.amount > 0) {
      setLoading(true);
      const { success, error } = await joinBet({
        betId: bet?.id,
        support: state.support,
        amount: state.amount,
      });
      setLoading(false);
      if (success) {
        navigation.goBack();
      } else {
        console.log("error", error); // TODO: dialog
      }
    } else {
      console.log("not enough money"); // TODO: dialog
    }
  }, [state.amount, state.support, bet, navigation]);

  return !bet ? (
    <Loading />
  ) : (
    <Screen>
      <ArtistRow {...bet.artist} />
      <BetStatsRow {...bet} />
      <GeneralSlider
        type="AMOUNT"
        initialValue={0}
        step={1}
        minSliderVal={0}
        maxSliderVal={currentUser?.money}
        onChange={handleChange}
        money={currentUser?.money}
      />
      <Wrapper margin="2rem 0rem 3rem 0rem">
        <Switch
          // ios_backgroundColor={theme.colors.background1}
          trackColor={{
            false: theme.colors.background1,
            true: theme.colors.background1,
          }}
          value={state.support}
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          onValueChange={() => setState((b) => ({ ...b, support: !b.support }))}
        />
      </Wrapper>
      <Wrapper margin="0rem 0rem 3rem 0rem">
        {state.support ? (
          <Label light>Support bet</Label>
        ) : (
          <Label light>Contradict bet</Label>
        )}
      </Wrapper>
      <Wrapper margin="0rem 0rem 2rem 0rem">
        <Button
          loading={loading}
          onPress={handleSubmit}
          label="Sumbit"
          disabled={state.amount === 0}
        />
      </Wrapper>
    </Screen>
  );
};

export default JoinBetScreen;
