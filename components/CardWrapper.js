import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-native-components";

const PotentiallyTouchable = styled((props) =>
  props.onPress ? <TouchableOpacity {...props} /> : <View {...props} />
)`
  align-self: stretch;
  margin: 2rem;
  border-radius: 2rem;
  background-color: $neutral;
  padding: 2rem;
`;

const CardWrapper = (props) => {
  return <PotentiallyTouchable {...props} />;
};

export default CardWrapper;
