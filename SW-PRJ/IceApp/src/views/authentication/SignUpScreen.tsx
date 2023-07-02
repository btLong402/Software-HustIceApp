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

const handlePress = () => {
  console.log('Forgot password pressed');
  // Add your forgot password logic here
};

const SignUp = () => (
  <View style={styles.container}>
    <Image
      source={require('../../assets/images/logo.png')}
      style={styles.logo}
    />
    <View style={styles.text_input}>
      <View style={styles.input_border}>
        <TextInput style={styles.input} placeholder="Email" />
      </View>
      <View style={styles.input_border}>
        <TextInput style={styles.input} placeholder="Password" />
      </View>
      <View style={styles.input_border}>
        <TextInput style={styles.input} placeholder="Confirm Password" />
      </View>
    </View>
    <TouchableOpacity style={styles.sign_up_btn} onPress={handlePress}>
      <Text style={styles.h1}>Never Hungry Again!</Text>
    </TouchableOpacity>
    <Text style={styles.h3}>or Sign Up with</Text>
    <View style={styles.social_sign_up}>
      <TouchableOpacity style={styles.social_btn} onPress={handlePress}>
        <Image source={require('../../assets/images/Facebook.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.social_btn} onPress={handlePress}>
        <Image source={require('../../assets/images/Google.png')} />
      </TouchableOpacity>
    </View>
  </View>
);

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
