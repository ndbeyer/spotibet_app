//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import Image from "../components/Image";
import Row from "../components/Row";
import Text from "../components/Text";

const TextBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ArtistRow = ({
  image,
  name,
  popularity,
  followers,
  monthlyListeners,
}) => {
  return (
    <Row>
      <Image source={image ? { uri: image } : { uri: undefined }} />
      <TextBox>
        <Text label={name} />
        <Text label={`Popularity: ${popularity}`} />
        <Text label={`Followers: ${followers}`} />
        <Text label={`Monthly listeners:: ${monthlyListeners}`} />
      </TextBox>
    </Row>
  );
};

export default ArtistRow;
