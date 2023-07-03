/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useLayoutEffect, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView, useToast, Box} from 'native-base';
import {useAuth} from '../../context/authContext';
import authService from '../../services/auth.service';

const handlePress = () => {
  console.log('Forgot password pressed');
  // Add your forgot password logic here
};

const phoneRegex =
  '^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$';

const signUpValidationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(
      new RegExp(phoneRegex),
      'Phone number is a Vietnamese phone number with 10 digits',
    ),
  username: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric')
    .min(6, 'Username must be at least 6 characters')
    .max(50, 'Username cannot be longer than 50 characters')
    .required('Username is required'),
  password: yup.string().min(6).max(50).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const SignUp = ({navigation}) => {
  const toast = useToast();

  const {signUp, mess} = useAuth();
  let isOpen = false;
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
      title: 'Sign Up',
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
  const scrollViewRef = useRef();
  const handleSubmit = async () => {
    await authService.register({});
  };
  return (
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={() => {
        if (!isOpen) {
          scrollViewRef.current.scrollToEnd({animated: true});
          isOpen = true;
        }
      }}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{
            phoneNumber: '',
            password: '',
            username: '',
            confirmPassword: '',
          }}
          onSubmit={async values => {
            const {password, phoneNumber, username} = values;
            try {
              await signUp({username, password, phoneNumber});
              if (mess?.type) {
                toast.show({
                  placement: 'top',
                  render: () => {
                    return (
                      <Box
                        px="2"
                        py="1"
                        rounded="sm"
                        mb={5}
                        bgColor={
                          mess.type === 'success' ? 'green.500' : 'red.200'
                        }>
                        {mess.message}
                      </Box>
                    );
                  },
                });
                mess.type === 'success' && navigation.goBack();
              }
            } catch (error) {
              toast.show({
                placement: 'top',
                render: () => {
                  return (
                    <Box px="2" py="1" rounded="sm" mb={5} bgColor={'red.200'}>
                      {error.message}
                    </Box>
                  );
                },
              });
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
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
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text
                    style={StyleSheet.compose(styles.input_border, {
                      color: 'red',
                    })}>
                    {errors.phoneNumber}
                  </Text>
                )}
                <View style={styles.input_border}>
                  <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                  />
                </View>
                {errors.username && touched.username && (
                  <Text
                    style={StyleSheet.compose(styles.input_border, {
                      color: 'red',
                    })}>
                    {errors.username}
                  </Text>
                )}
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
                {errors.password && touched.password && (
                  <Text
                    style={StyleSheet.compose(styles.input_border, {
                      color: 'red',
                    })}>
                    {errors.password}
                  </Text>
                )}
                <View style={styles.input_border}>
                  <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                  />
                </View>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text
                    style={StyleSheet.compose(styles.input_border, {
                      color: 'red',
                    })}>
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.sign_up_btn}
                onPress={handleSubmit}
                disabled={
                  errors.phoneNumber ||
                  errors.password ||
                  errors.username ||
                  errors.confirmPassword
                }>
                <Text style={styles.h1}>Never Hungry Again!</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <TouchableOpacity style={styles.sign_up_btn} onPress={handleSubmit}>
          <Text style={styles.h1}>Never Hungry Again!</Text>
        </TouchableOpacity>
        {/* <Text style={styles.h3}>or Sign Up with</Text>
        <View style={styles.social_sign_up}>
          <TouchableOpacity style={styles.social_btn} onPress={handlePress}>
            <Image source={require('../../assets/images/Facebook.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.social_btn} onPress={handlePress}>
            <Image source={require('../../assets/images/Google.png')} />
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'crimson',
    alignItems: 'center',
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
  },
  input: {
    flex: 1,
    paddingLeft: 20,
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
  sign_up_btn: {
    width: 221,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC4F00',
    borderRadius: 33,
    marginVertical: 50,
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
  social_sign_up: {
    display: 'flex',
    flexDirection: 'row',
    width: 77,
    justifyContent: 'space-between',
  },
  social_btn: {},
  footer: {
    marginVertical: 218,
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

export default SignUp;
