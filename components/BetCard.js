//@format
//@flow

import React from "react";
import styled from "styled-native-components";
import CardWrapper from "../components/CardWrapper";
import ArtistRow from "../components/ArtistRow";
import Text from "../components/Text";
import BetStatsRow from "./BetStatsRow";

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
`;

const currentUserWins = (
  listeners,
  listenersAtEndDate,
  type,
  currentUserSupports
) => {
  if (type === "HIGHER" && currentUserSupports === true) {
    return listenersAtEndDate > listeners;
  }
  if (type === "HIGHER" && currentUserSupports === false) {
    return !(listenersAtEndDate > listeners);
  }
  if (type === "LOWER" && currentUserSupports === true) {
    return listenersAtEndDate <= listeners;
  }
  if (type === "LOWER" && currentUserSupports === false) {
    return !(listenersAtEndDate <= listeners);
  }
};

const TextBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const BetResultRow = ({
  listeners,
  listenersAtEndDate,
  type,
  currentUserSupports,
  currentUserAmount,
}) => {
  const userWins = React.useMemo(() => {
    return currentUserWins(
      listeners,
      listenersAtEndDate,
      type,
      currentUserSupports
    );
  }, [listeners, listenersAtEndDate, type, currentUserSupports]);

  return (
    <Wrapper>
      <TextBox>
        <Text label={`Listeners at the end: ${listenersAtEndDate}`} />
        <Text>
          You {currentUserSupports === true ? "supported" : "did not support"}{" "}
          the bet{" "}
        </Text>
        <Text>
          You {userWins ? "Win" : "Lost"}{" "}
          {userWins ? `some bugs` : `${currentUserAmount} bugs`}
        </Text>
      </TextBox>
    </Wrapper>
  );
};

const BetCard = ({ id, artist, status, ...rest }) => {
  return (
    <>
      <CardWrapper key={id}>
        <ArtistRow {...artist} />
        <BetStatsRow {...rest} />
        {status === "ENDED" ? <BetResultRow {...rest} /> : null}
      </CardWrapper>
    </>
  );
};

export default BetCard;
