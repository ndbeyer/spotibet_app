//@format
//@flow

import React from 'react';
import styled from 'styled-native-components';

import CardWrapper from './CardWrapper';
import Row from './Row';
import Button from './Button';
import Text from './Text';
import {useNavigation} from 'react-navigation-hooks';
import {format} from 'date-fns';

const TextBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const JoinableTime = ({startDate}) => {

  const [clock, setClock] = React.useState(0)
  const joinableUntilMS = React.useMemo(
    () => Number(startDate) + 24 * 60 * 60 * 1000,
    [startDate],
  );
   // eslint-disable-next-line react-hooks/exhaustive-deps
  const joinableForMS = React.useMemo(() => format(joinableUntilMS - Date.now(), "HH:mm:ss"), [  
    joinableUntilMS, clock
  ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setClock(before => before+1);
    }, 1000);
    return () => clearInterval(interval)
  }, []);

  return (
    <Text>
      Joinable:{joinableForMS}
    </Text>
  );
};

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
        {format(
          new Date(new Date(Number(startDate)) + ' UTC'),
          'dd.MM.yyyy HH:mm:ss',
        )}
      </Text>
      <Text>Quote: {quote}</Text>
      <Text>
        That the artist {type === 'HIGHER' ? 'exceeds' : 'falls below'}{' '}
        {listeners}
      </Text>
      <Text>
        Ending:{' '}
        {format(
          new Date(new Date(Number(endDate)) + ' UTC'),
          'dd.MM.yyyy HH:mm:ss',
        )}
      </Text>
      <JoinableTime startDate={startDate} />
      {currentUserAmount ? (
        <Text>You joined this bet with: {currentUserAmount}</Text>
      ) : null}
    </TextBox>
  );
};

const BetCard = ({id, ...rest}) => {
  const navigation = useNavigation();

  const handlePress = React.useCallback(() => {
    navigation.navigate('JoinBet', {betId: id});
  }, [navigation, id]);

  return (
    <>
      <CardWrapper key={id}>
        <BetStatsRow {...rest} />
        <Row>
          <Button onPress={handlePress} label="Join" />
        </Row>
      </CardWrapper>
    </>
  );
};

export default BetCard;
