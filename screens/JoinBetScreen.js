//@format
//@flow

import React from "react";
import { Switch } from "react-native";
import styled from "styled-native-components";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";

import Loading from "../components/Loading";
import Screen from "../components/Screen";
import Scroll from "../components/Scroll";
import Button from "../components/Button";
import GeneralSlider from "../components/GeneralSlider";
import CardWrapper from "../components/CardWrapper";
import Row from "../components/Row";
import Text from "../components/Text";
import BetCard from "../components/BetCard";

import { useBet, joinBet } from "../state/bet";
import { useUser } from "../state/user";

const JoinBetScreen = () => {
  console.log("JoinBetScreen");
  const navigation = useNavigation();
  const betId = useNavigationParam("betId");
  const bet = useBet(betId);
  const currentUser = useUser();

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
    <Screen>
      {!bet ? (
        <Loading />
      ) : (
        <Scroll>
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
            <Row margin="2rem 0rem 3rem 0rem">
              <Switch
                value={state.support}
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                onValueChange={() =>
                  setState((b) => ({ ...b, support: !b.support }))
                }
              />
            </Row>
            <Row margin="0rem 0rem 3rem 0rem">
              {state.support ? (
                <Text>Support bet</Text>
              ) : (
                <Text>Contradict bet</Text>
              )}
            </Row>
            <Row margin="0rem 0rem 2rem 0rem">
              <Button
                loading={loading}
                onPress={handleSubmit}
                label="Sumbit"
                disabled={state.amount === 0}
              />
            </Row>
          </CardWrapper>
        </Scroll>
      )}
    </Screen>
  );
};

export default JoinBetScreen;
