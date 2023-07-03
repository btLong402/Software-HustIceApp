import React from 'react';
import {useAuth} from '../context/authContext';
import {Touchable} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

function CheckSignOutTouchable({navigation, children, authPageName = 'Home'}) {
  const {isSignout} = useAuth();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(isSignout ? 'SignIn' : authPageName)}>
      {children}
    </TouchableWithoutFeedback>
  );
}

export default CheckSignOutTouchable;
