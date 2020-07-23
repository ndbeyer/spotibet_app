//@format
//@flow

import React from "react";
import styled, { useTheme } from "styled-native-components";
import { Switch } from "react-native";

import Button from "./Button";
import AmountSlider from "./AmountSlider";
import { Label, Paragraph } from "./Text";
import BetStats from "./BetStats";
import { useBet, joinBet } from "../state/bet";
import { useUser } from "../state/user";
import delay from "../util/delay";

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

const SuccessWrapper = styled.View`
  height: 5rem;
  flex-direction: row;
  align-self: stretch;
  justify-content: center;
  align-items: center;
`;

const expectedErrors = {
  NETWORK_ERROR: "Network error. You seem to be offline.",
  BET_NOT_JOINABLE: "You can no longer join this bet.",
  NOT_ENOUGH_MONEY: "You don't have enough money.",
};

const JoinBet = ({
  betId,
  closePortal,
  renderPortal,
}: {
  betId: string,
  closePortal: () => any,
  renderPortal: () => any, // TODO
}) => {
  const theme = useTheme();
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

  const [joinedBet, setJoinedBet] = React.useState(false);

  const handleError = React.useCallback(
    (errorCode) => {
      renderPortal({
        title: "Error",
        description: expectedErrors[errorCode] || "Unexpected Error",
      });
    },
    [renderPortal]
  );

  const handleSubmit = React.useCallback(async () => {
    setLoading(true);
    // TODO: handle api errors
    const { success, error } = await joinBet({
      betId: bet?.id,
      support: state.support,
      amount: state.amount,
    });
    setLoading(false);
    if (success) {
      setJoinedBet(true);
    } else {
      handleError(error);
    }
  }, [bet, state.support, state.amount, handleError]);

  React.useEffect(() => {
    if (joinedBet) {
      (async () => {
        await delay(2000);
        closePortal();
      })();
    }
  }, [betId, closePortal, joinedBet]);

  return !joinedBet ? (
    <>
      <BetStats
        {...bet}
        currentListeners={bet?.artist?.monthlyListeners}
        currentUserSupports={state.support}
        presentationType="CREATE"
      />
      <AmountSlider
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
    </>
  ) : (
    <SuccessWrapper>
      <Paragraph flex align="center">
        Successfully joined bet...
      </Paragraph>
    </SuccessWrapper>
  );
};

export default JoinBet;
