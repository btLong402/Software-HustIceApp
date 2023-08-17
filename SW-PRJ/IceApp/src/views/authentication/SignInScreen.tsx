/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Popover, useToast, Box, VStack} from 'native-base';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useAuth} from '../../context/authContext';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useLayoutEffect} from 'react';

// const phoneRegex =
//   '^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$';

const loginValidationSchema = yup.object().shape({
  phoneNumber: yup.string().required(),
  password: yup.string().required(),
});

const SignIn = ({navigation}) => {
  const toast = useToast();

  const {signIn, mess, setMess} = useAuth();
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
      title: 'Log In',
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

  useEffect(() => {
    if (mess?.type) {
      toast.show({
        placement: 'top',
        duration: mess.type === 'success' ? 1000 : 2000,
        render: () => {
          return (
            <Box
              px="2"
              py="1"
              rounded="sm"
              mb={5}
              bgColor={mess.type === 'success' ? 'green.500' : 'red.200'}>
              {mess.message}
            </Box>
          );
        },
      });
      setMess(null);
    }
  }, [mess]);

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <VStack alignItems={'center'} flex={1}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{phoneNumber: '', password: ''}}
          onSubmit={async values => {
            // console.log(values);
            try {
              await signIn({...values});
            } catch (error) {
              setMess({type: 'error', message: error.message});
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isValid,
            touched,
          }) => {
            const isDisabled =
              !isValid ||
              (Object.keys(touched).length === 0 && 
                touched.constructor === Object);
            return (
              <>
                <View style={styles.text_input}>
                  <View style={styles.input_border}>
                    <TextInput
                      style={styles.input}
                      placeholder="Phone Number"
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      value={values.phoneNumber}
                    />
                  </View>
                  <View style={styles.input_border}>
                    <TextInput
                      style={styles.input}
                      secureTextEntry={true}
                      placeholder="Password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.forgot_password}
                    onPress={() => navigation.navigate('ResetPassword')}>
                    <Text style={styles.h2}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={StyleSheet.compose(styles.sign_in_btn, {
                    backgroundColor: isDisabled ? 'gray' : '#FC4F00',
                  })}
                  onPress={handleSubmit}
                  disabled={isDisabled}>
                  <Text style={styles.h1}>Eat Away!</Text>
                </TouchableOpacity>
              </>
            );
          }}
        </Formik>
        {/* <Text style={styles.h3}>Sign in with</Text> */}
        {/* <View style={styles.social_sign_in}>
          <TouchableOpacity style={styles.social_btn} onPress={handlePress}>
            <Image source={require('../../assets/images/Facebook.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.social_btn} onPress={handlePress}>
            <Image source={require('../../assets/images/Google.png')} />
          </TouchableOpacity>
        </View> */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footer_btn}
            onPress={() => navigation.navigate('SignUp')}>
            <Image source={require('../../assets/images/Vector-up.png')} />
            <Text style={styles.h1}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </VStack>
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'crimson',
  },
  logo: {
    width: 250,
    height: 250,
  },
  text_input: {
    alignItems: 'center',
  },
  input_border: {
    width: 277,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    marginVertical: 10,
    paddingLeft: 15,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  forgot_password: {
    marginLeft: 140,
    marginVertical: 10,
  },
  h2: {
    fontWeight: '400',
    fontSize: 14,
    fontStyle: 'italic',
    color: 'white',
    lineHeight: 16,
  },
  sign_in_btn: {
    width: 217,
    height: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC4F00',
    borderRadius: 33,
    marginVertical: 10,
  },
  h1: {
    fontWeight: '900',
    fontSize: 16,
    color: 'white',
    lineHeight: 19,
  },
  h3: {
    fontWeight: '400',
    fontSize: 14,
    color: 'white',
    marginVertical: 20,
  },
  social_sign_in: {
    display: 'flex',
    flexDirection: 'row',
    width: 77,
    justifyContent: 'space-between',
  },
  social_btn: {},
  footer: {
    position: 'absolute',
    bottom: 0,
  },
  footer_btn: {
    width: 345,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopRightRadius: 33,
    borderTopLeftRadius: 33,
    backgroundColor: '#FC4F00',
  },
});

export default SignIn;
