//@format
//@flow

import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useNavigation } from "react-navigation-hooks";

import Loading from "../components/Loading";
import Screen from "../components/Screen";
import Scroll from "../components/Scroll";
import Button from "../components/Button";
import GeneralSlider from "../components/GeneralSlider";
import CardWrapper from "../components/CardWrapper";
import Row from "../components/Row";
import ArtistRow from "../components/ArtistRow";
import OpenBet from "../components/OpenBet";

const ArtistScreen = () => {
  const navigation = useNavigation();

  // query
  const {
    loading: queryLoading,
    data: queryData,
    error: queryError,
  } = useQuery(
    gql`
      query artist($id: ID!) {
        artist(id: $id) {
          id
          name
          image
          popularity
          followers
          monthlyListeners
          spotifyUrl
          joinableBets {
            id
            quote
            listeners
            type
            startDate
            endDate
            currentUserAmount
          }
        }
      }
    `,
    {
      variables: {
        id: navigation.state.params.artistId,
      },
    }
  );

  console.log(
    "Artist: data",
    queryData,
    "\n loading",
    queryLoading,
    "\n error",
    queryError
  );

  const { artist } = queryData || {};
  const { id, spotifyUrl, monthlyListeners, onPress, joinableBets, name } =
    artist || {};

  // state
  const [state, setState] = React.useState({
    listeners: null,
    endDate: null,
  });

  const handleChange = React.useCallback((obj) => {
    setState((before) => ({ ...before, ...obj }));
  }, []);

  // mutation
  const [
    createBet,
    { data: mutationData, loading: mutationLoading },
  ] = useMutation(
    gql`
      mutation createBet(
        $artistId: ID!
        $artistName: String!
        $type: BetType!
        $listeners: Int!
        $endDate: String!
        $spotifyUrl: String!
      ) {
        createBet(
          artistId: $artistId
          artistName: $artistName
          type: $type
          listeners: $listeners
          endDate: $endDate
          spotifyUrl: $spotifyUrl
        ) {
          bet {
            id
          }
          success
        }
      }
    `,
    {
      refetchQueries: ["artist"],
    }
  );

  const handleSubmit = React.useCallback(() => {
    if (state.listeners !== monthlyListeners && state.endDate) {
      createBet({
        variables: {
          artistId: id,
          artistName: name,
          type: state.listeners > monthlyListeners ? "HIGHER" : "LOWER",
          listeners: state.listeners,
          endDate: state.endDate,
          spotifyUrl,
        },
      });
    } else {
      console.log("Error, inputs are missing");
    }
  }, [createBet, id, state, monthlyListeners, spotifyUrl, name]);

  React.useEffect(() => {
    if (
      mutationData &&
      mutationData.createBet &&
      mutationData.createBet.success
    ) {
      (async () => {
        navigation.navigate("JoinBet", {
          betId: mutationData.createBet.bet.id,
        });
      })();
    }
  }, [mutationData, navigation]);

  return (
    <Screen>
      {queryLoading ? (
        <Loading />
      ) : (
        <Scroll>
          <CardWrapper key={id} onPress={onPress}>
            <ArtistRow {...artist} />
            <>
              <GeneralSlider
                type="LISTENERS"
                initialValue={0}
                step={1}
                minSliderVal={-100}
                maxSliderVal={100}
                onChange={handleChange}
                monthlyListeners={monthlyListeners}
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
                  loading={mutationLoading}
                  onPress={handleSubmit}
                  label="Sumbit"
                  disabled={
                    state.listeners === monthlyListeners || !state.endDate
                  }
                />
              </Row>
            </>
          </CardWrapper>
          {joinableBets
            ? joinableBets.map((bet) => <OpenBet key={bet.id} {...bet} />)
            : null}
        </Scroll>
      )}
    </Screen>
  );
};

export default ArtistScreen;
