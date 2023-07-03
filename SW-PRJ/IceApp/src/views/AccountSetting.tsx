import React, {useLayoutEffect} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../context/authContext';
import {Box, Text} from 'native-base';
import {TouchableWithoutFeedback} from 'react-native';
function AccountSetting({navigation}) {
  const {signOut} = useAuth();

  useLayoutEffect(() => {
    const headerLeft = () => (
      <Ionicons
        name="arrow-back"
        size={30}
        color="crimson"
        style={{marginLeft: 10}}
        onPress={() => {
          navigation.goBack();
        }}
      />
    );
    navigation.setOptions({
      title: 'Account Setting',
      headerLeft: headerLeft,
      headerTintColor: 'black',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        fontSize: 20, // set the font size of the header title to 20
        fontWeight: 500, // set the font weight of the header title to bold
        letterSpacing: 1, // set the letter spacing to 0.5
      },
    });
  }, [navigation]);

  return (
    <TouchableWithoutFeedback
      onPress={async () => {
        await signOut();
      }}>
      <Box
        marginTop={10}
        bgColor={'crimson'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'80%'}
        alignSelf={'center'}>
        <Text
          color="white"
          paddingX={2}
          paddingY={1}
          fontSize={'2xl'}
          fontWeight={'bold'}>
          Log out
        </Text>
      </Box>
    </TouchableWithoutFeedback>
  );
}

export default AccountSetting;
