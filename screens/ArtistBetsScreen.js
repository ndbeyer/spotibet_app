import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-native-components";

import ScrollViewScreen from "../components/ScrollViewScreen";
import Button from "../components/Button";
import Loading from "../components/Loading";
import ArtistStats from "../components/ArtistStats";
import ArtistImage from "../components/ArtistImage";
import Graph from "../components/Graph";
import CreateBet from "../components/CreateBet";
import JoinBet from "../components/JoinBet";
import { Label } from "../components/Text";

import { useArtist } from "../state/artist";
import { usePortal } from "../components/PortalProvider";

const ArtistBetsScreen = () => {
  return (
    <ScrollViewScreen>
      <Label>ArtistBetScreen</Label>
    </ScrollViewScreen>
  );

  /* {artist?.joinableBets?.map((bet) => (
        <CardWrapper key={bet.id}>
          <BetStats {...bet} currentListeners={artist?.monthlyListeners} />
          <Wrapper>
            <Button
              backgroundColor="$background0"
              onPress={() => handleOpenBet(bet.id)}
              label="Join"
            />
          </Wrapper>
        </CardWrapper>
      ))} */
};

export default ArtistBetsScreen;
