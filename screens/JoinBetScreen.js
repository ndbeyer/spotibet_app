//@format
//@flow

import React from "react";
import styled from "styled-native-components";
import { Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import Button from "../components/Button";
import GeneralSlider from "../components/GeneralSlider";
import CardWrapper from "../components/CardWrapper";
import { Label } from "../components/Text";
import BetCard from "../components/BetCard";

import { useBet, joinBet } from "../state/bet";
import { useUser } from "../state/user";

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
`;

const JoinBetScreen = ({ route }) => {
  const navigation = useNavigation();
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

  return (
    <Screen loading={!bet}>
      <BetCard {...bet} />
      <CardWrapper>
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
            value={state.support}
            // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
            onValueChange={() =>
              setState((b) => ({ ...b, support: !b.support }))
            }
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
      </CardWrapper>
    </Screen>
  );
};

export default JoinBetScreen;
