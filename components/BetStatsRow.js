//@format
//@flow

import React from 'react';
import styled from 'styled-native-components';
import {formatMilliSeconds} from "../util/dateHelpers"

import Text from './Text';

const TextBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const BetStatsRow = ({
  listeners,
  quote,
  type,
  startDate,
  endDate,
  currentUserAmount,
}) => {
  return (
    <TextBox>
      <Text>
        Started{' '}
        {formatMilliSeconds(startDate)}
      </Text>
      <Text>Quote: {quote}</Text>
      <Text>
        That the artist {type === 'HIGHER' ? 'exceeds' : 'falls below'}{' '}
        {listeners}
      </Text>
      <Text>
        Ending:{' '}
        {formatMilliSeconds(endDate)}
      </Text>
      {currentUserAmount ? (
        <Text>You joined this bet with: {currentUserAmount}</Text>
      ) : null}
    </TextBox>
  );
};

export default BetStatsRow