//@format
//@flow

import React from "react";
import { TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-native-components";

import ScrollViewScreen from "../components/ScrollViewScreen";
import EmptyCard from "../components/EmptyCard";
import { Paragraph, Label } from "../components/Text";
import CardWrapper from "../components/CardWrapper";
import BetStats from "../components/BetStats";
import Image from "../components/Image";
import Loading from "../components/Loading";

import { BetInfoFragment } from "../state/bet";
import { ArtistInfoFragment } from "../state/artist";

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
    return listenersAtEndDate >= listeners;
  }
  if (type === "HIGHER" && currentUserSupports === false) {
    return !(listenersAtEndDate >= listeners);
  }
  if (type === "LOWER" && currentUserSupports === true) {
    return listenersAtEndDate < listeners;
  }
  if (type === "LOWER" && currentUserSupports === false) {
    return !(listenersAtEndDate < listeners);
  }
};

const Row = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.View`
  flex-direction: column;
`;

const Center = styled.View`
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
      <Center>
        <Paragraph>{`Listeners at the end: ${listenersAtEndDate}`}</Paragraph>
        <Paragraph>
          You {currentUserSupports === true ? "supported" : "did not support"}{" "}
          the bet
        </Paragraph>
        <Paragraph>
          You {userWins ? "Win" : "Lost"}{" "}
          {userWins ? `some bugs` : `${currentUserAmount} bugs`}
        </Paragraph>
      </Center>
    </Wrapper>
  );
};

const BetCard = ({ id, artist, status, ...rest }) => {
  return (
    <>
      <CardWrapper key={id}>
        <Row>
          <Column>
            <Image source={artist?.image} />
            <Label light size="s" margin="1rem" align="center">
              {artist?.name}
            </Label>
          </Column>
          <BetStats
            {...rest}
            currentListeners={artist?.monthlyListeners}
            presentationType="REPORT"
          />
        </Row>

        {status === "ENDED" ? <BetResultRow {...rest} /> : null}
      </CardWrapper>
    </>
  );
};

const filterTypes = ["JOINABLE", "INVALID", "RUNNING", "ENDED"];

const FilterWrapper = styled.View`
  width: 100%;
  height: 6rem;
  border-radius: 0.5rem;
  flex-direction: row;
`;

const FilterItem = styled(TouchableOpacity)`
  background-color: ${(p) => (p.selected ? `$background1` : `$background0`)};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const DashboardScreen = () => {
  const { data } = useQuery(
    gql`
      query dashboard {
        currentUser {
          id
          spotify_profile_id
          money
          bets {
            ...BetInfoFragment
            artist {
              ...ArtistInfoFragment
            }
          }
        }
      }
      ${ArtistInfoFragment}
      ${BetInfoFragment}
    `
  );

  const [selected, setSelected] = React.useState(filterTypes[0]);

  const filteredBets = data?.currentUser?.bets?.filter(
    ({ status }) => status === selected
  );

  const renderHeaderContent = React.useCallback(() => {
    return (
      <FilterWrapper>
        {filterTypes.map((label) => (
          <FilterItem
            key={label}
            selected={selected === label}
            // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
            onPress={() => setSelected(label)}
          >
            <Paragraph>{label[0] + label.substr(1).toLowerCase()}</Paragraph>
          </FilterItem>
        ))}
      </FilterWrapper>
    );
  }, [selected]);

  return !filteredBets ? (
    <Loading />
  ) : (
    <ScrollViewScreen renderHeaderContent={renderHeaderContent}>
      {filteredBets?.length ? (
        filteredBets.map((bet) => {
          return <BetCard key={bet.id} {...bet} />;
        })
      ) : (
        <EmptyCard message="No bets were found" />
      )}
    </ScrollViewScreen>
  );
};

export default DashboardScreen;
