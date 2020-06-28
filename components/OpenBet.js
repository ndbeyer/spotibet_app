//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import CardWrapper from "./CardWrapper";
import Button from "./Button";
import BetStatsRow from "./BetStatsRow";
import { useNavigation } from "@react-navigation/native";

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
`;

// const JoinableTime = ({ startDate }) => {
//   const [clock, setClock] = React.useState(0);
//   const joinableUntilMS = React.useMemo(
//     () => Number(startDate) + 24 * 60 * 60 * 1000,
//     [startDate]
//   );
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const joinableForMS = React.useMemo(
//     () => format(joinableUntilMS - Date.now(), "HH:mm:ss"),
//     [joinableUntilMS, clock]
//   );

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setClock((before) => before + 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return <Text>Joinable:{joinableForMS}</Text>;
// };

const BetCard = ({ id, ...rest }) => {
  const navigation = useNavigation();

  const handlePress = React.useCallback(() => {
    navigation.navigate("JoinBet", { betId: id });
  }, [navigation, id]);

  return (
    <>
      <CardWrapper key={id}>
        <BetStatsRow {...rest} />
        <Wrapper>
          <Button onPress={handlePress} label="Join" />
        </Wrapper>
      </CardWrapper>
    </>
  );
};

export default BetCard;
