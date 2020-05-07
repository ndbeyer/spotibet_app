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

import { useBet } from "../state/bet";
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

  const handleChange = React.useCallback((obj) => {
    setState((before) => ({ ...before, ...obj }));
  }, []);

  const [
    joinBet,
    { data: mutationData, loading: mutationLoading },
  ] = useMutation(
    gql`
      mutation joinBet($betId: ID!, $support: Boolean!, $amount: Int!) {
        joinBet(betId: $betId, support: $support, amount: $amount) {
          success
        }
      }
    `,
    {
      refetchQueries: ["header", "dashboard", "transaction"],
      // update(cache, {data}) {
      //   console.log('data', data);
      // },
    }
  );

  const handleSubmit = React.useCallback(() => {
    if (state.amount > 0) {
      joinBet({
        variables: {
          betId: bet?.id,
          support: state.support,
          amount: state.amount,
        },
      });
    } else {
      console.log("Error, inputs are missing");
    }
  }, [state.amount, state.support, joinBet, bet]);

  React.useEffect(() => {
    if (mutationData && mutationData.joinBet && mutationData.joinBet.success) {
      navigation.replace("Playlists");
    }
  }, [mutationData, navigation]);

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
                loading={mutationLoading}
                onPress={handleSubmit}
                label="Sumbit"
                disabled={state.amount === 0 || Boolean(mutationData)}
              />
            </Row>
          </CardWrapper>
        </Scroll>
      )}
    </Screen>
  );
};

export default JoinBetScreen;
