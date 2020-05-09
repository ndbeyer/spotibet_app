//@format
//@flow

import React from "react";
import { TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-native-components";

import Screen from "../components/Screen";
import Scroll from "../components/Scroll";
import Loading from "../components/Loading";
import EmptyCard from "../components/EmptyCard";
import BetCard from "../components/BetCard";
import Text from "../components/Text";

import { BetInfoFragment } from "../state/bet";
import { ArtistInfoFragment } from "../state/artist";

const filterTypes = ["JOINABLE", "INVALID", "RUNNING", "ENDED"];

const Border = styled.View`
  width: 100%;
  height: 1rem;
  background-color: $background;
`;

const FilterWrapper = styled.View`
  width: 100%;
  height: 12rem;
  border-radius: 1rem;
  flex-direction: row;
`;

const FilterItem = styled(TouchableOpacity)`
  background-color: ${(p) => (p.selected ? `$accent` : `$background`)};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const DashboardScreen = () => {
  const { loading, error, data, refetch } = useQuery(
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

  const filteredBets =
    data &&
    data.currentUser &&
    data.currentUser.bets &&
    data.currentUser.bets.filter(({ status }) => status === selected);

  return (
    <Screen>
      <FilterWrapper>
        {filterTypes.map((label) => (
          <FilterItem
            key={label}
            selected={selected === label}
            // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
            onPress={() => setSelected(label)}
          >
            <Text label={label[0] + label.substr(1).toLowerCase()} />
          </FilterItem>
        ))}
      </FilterWrapper>
      <Border />
      {loading ? (
        <Loading />
      ) : (
        <Scroll loading={loading} onRefresh={refetch}>
          {filteredBets.length ? (
            filteredBets.map((bet) => {
              return <BetCard key={bet.id} {...bet} />;
            })
          ) : (
            <EmptyCard message="No bets were found" />
          )}
        </Scroll>
      )}
    </Screen>
  );
};

export default DashboardScreen;
