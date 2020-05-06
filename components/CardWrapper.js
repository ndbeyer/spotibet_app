import React from 'react';
import {TouchableOpacity, View, Dimensions} from 'react-native';
import styled, {useTheme} from 'styled-native-components';

const CARD_MARGIN_REM = 3;

const TouchableCard = styled(TouchableOpacity)`
  width: ${p => p.width}px;
  margin-left: ${CARD_MARGIN_REM}rem;
  margin-right: ${CARD_MARGIN_REM}rem;
  margin-bottom: ${CARD_MARGIN_REM}rem;
  border-radius: 2rem;
  background-color: $main;
  padding: 2rem;
`;

const Card = styled.View`
  width: ${p => p.width}px;
  margin-left: ${CARD_MARGIN_REM}rem;
  margin-right: ${CARD_MARGIN_REM}rem;
  margin-bottom: ${CARD_MARGIN_REM}rem;
  border-radius: 2rem;
  background-color: $main;
  padding: 2rem;
`;

const CardWrapper = ({onPress, ...rest}) => {
  const {rem} = useTheme();
  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const CARD_WIDTH = SCREEN_WIDTH - CARD_MARGIN_REM * rem * 2;
  
  return onPress ? (
    <TouchableCard {...rest} onPress={onPress} width={CARD_WIDTH} />
  ) : (
    <Card {...rest} width={CARD_WIDTH} />
  );
};

export default CardWrapper;
