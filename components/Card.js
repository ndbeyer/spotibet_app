import styled from 'styled-native-components';
import React from 'react';

import CardWrapper from './CardWrapper';
import Image from './Image';
import Text from './Text';
import Row from './Row';

const TextBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Card = ({id, name, image, onPress}) => {
  return (
    <CardWrapper key={id} onPress={onPress}>
      <Row>
        <Image source={image ? {uri: image} : {uri: undefined}} />
        <TextBox>
          <Text>{name}</Text>
        </TextBox>
      </Row>
    </CardWrapper>
  );
};

export default Card;
