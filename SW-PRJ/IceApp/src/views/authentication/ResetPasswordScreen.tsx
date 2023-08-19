import {useLayout, useToast} from 'native-base';
import {useLayoutEffect, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../context/authContext';
import {Box} from 'native-base';
import {Formik} from 'formik';
import * as yup from 'yup';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const phoneRegex =
  '^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$';

const resetPasswordSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(new RegExp(phoneRegex), 'Phone number must contains 10 digits')
    .required(' '),
});

const ResetPassword = ({navigation}: any) => {
  const toast = useToast();

  const {mess, setMess} = useAuth();

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
      title: 'Reset Password',
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
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Formik
        validationSchema={resetPasswordSchema}
        initialValues={{
          phoneNumber: '',
        }}
        onSubmit={async values => {
          const {phoneNumber} = values;
          try {
            // await signUp({username, password, phoneNumber});
          } catch (error: any) {
            setMess({type: 'error', message: error.message});
          }
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => {
          console.log('errors', errors);
          console.log('touched', touched);
          console.log('isValid', isValid);
          const isDisabled = !isValid || errors.phoneNumber;
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
                <Text style={{color: 'black'}}>
                  {errors.phoneNumber ? errors.phoneNumber : ''}
                </Text>
              </View>
              <TouchableOpacity
                style={StyleSheet.compose(styles.sign_up_btn, {
                  backgroundColor: isDisabled ? 'gray' : '#FC4F00',
                })}
                onPress={handleSubmit}
                disabled={isDisabled}>
                <Text style={styles.h1}>Next</Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
    </View>
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

// import React, {useState, useEffect, useLayoutEffect} from 'react';
// import {Button, TextInput} from 'react-native';
// import firebaseSetup from '../../../firebase.config.js';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {ConfirmationResult} from 'firebase/auth';

// function ResetPassword({navigation}) {
//   // If null, no SMS has been sent
//   const {auth} = firebaseSetup();
//   const [confirm, setConfirm] = useState(null);

//   // verification code (OTP - One-Time-Passcode)
//   const [code, setCode] = useState('');

//   // useLayoutEffect(() => {
//   //   const headerLeft = () => (
//   //     <Ionicons
//   //       name="arrow-back"
//   //       size={30}
//   //       color="crimson"
//   //       style={{marginLeft: 10}}
//   //       onPress={() => {
//   //         navigation.goBack();
//   //       }}
//   //     />
//   //   );
//   //   navigation.setOptions({
//   //     title: 'Reset Password',
//   //     headerLeft: headerLeft,
//   //     headerTintColor: 'black',
//   //     headerStyle: {
//   //       backgroundColor: 'white',
//   //     },
//   //     headerTitleStyle: {
//   //       fontSize: 20, // set the font size of the header title to 20
//   //       fontWeight: 500, // set the font weight of the header title to bold
//   //       letterSpacing: 1, // set the letter spacing to 0.5
//   //     },
//   //   });
//   // }, [navigation]);

//   // Handle login
//   // function onAuthStateChanged(user) {
//   //   if (user) {
//   //     // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
//   //     // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
//   //     // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
//   //     // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
//   //   }
//   // }

//   // useEffect(() => {
//   //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//   //   return subscriber; // unsubscribe on unmount
//   // }, []);

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber: string) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <Button
//         title="Phone Number Sign In"
//         onPress={() => signInWithPhoneNumber('+84 783225966')}
//       />
//     );
//   }

//   return (
//     <>
//       <TextInput value={code} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );
// }

export default ResetPassword;
