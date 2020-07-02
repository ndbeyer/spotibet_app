//@format
//@flow

import React from "react";
import styled from "styled-native-components";

import Image from "../components/Image";
import { Heading, Paragraph } from "../components/Text";

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
`;

const Center = styled.View`
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
    <Wrapper>
      <Image source={image} />
      <Center>
        <Heading margin="1rem" size="m">
          {name}
        </Heading>
        <Paragraph light>{`Popularity: ${popularity}`}</Paragraph>
        <Paragraph light>{`Followers: ${followers}`}</Paragraph>
        <Paragraph light>{`Monthly listeners:: ${monthlyListeners}`}</Paragraph>
      </Center>
    </Wrapper>
  );
};

export default ArtistRow;
