//@format
//@flow

import React from 'react';
import styled from 'styled-native-components';
import {formatMilliSeconds} from '../util/dateHelpers';

import CardWrapper from '../components/CardWrapper';
import Text from '../components/Text';

const RowWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TransactionCard = ({id, type, amount, betId, datetime}) => {
  return (
    <>
      <CardWrapper>
        <RowWrapper>
          <Text>{formatMilliSeconds(datetime)}</Text>
          <Text>
            {type === 'MINUS' ? '-' : '+'}
            {amount}
          </Text>
        </RowWrapper>
      </CardWrapper>
    </>
  );
};

export default TransactionCard;
