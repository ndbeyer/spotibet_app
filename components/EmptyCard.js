import styled from 'styled-native-components';
import React from 'react';

import CardWrapper from './CardWrapper';
import Text from './Text';
import Row from './Row';

const TextBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const EmptyCard = ({message}) => {
  return (
    <CardWrapper>
      <Row>
        <TextBox>
          <Text>{message}</Text>
        </TextBox>
      </Row>
    </CardWrapper>
  );
};

export default EmptyCard;
