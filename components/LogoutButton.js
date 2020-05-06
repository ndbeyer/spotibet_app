//@format
//@flow

import React from 'react';
import Button from './Button';
import {setToken} from '../util/token';
import {useNavigation} from 'react-navigation-hooks';

const Header = () => {
  const navigation = useNavigation();

  const handleLogout = React.useCallback(() => {
    setToken(undefined);
    navigation.navigate('loggedOut');
  }, [navigation]);

  return <Button color="$accent" label="Logout" onPress={handleLogout} />;
};

export default Header;
