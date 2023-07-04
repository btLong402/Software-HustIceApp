/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
const Splash = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={styles.img}
          source={require('../assets/images/logo.png')}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.h1}>Welcome to Mixue HUST</Text>
        <Text style={styles.h2}>Order the best meals in Vietnam and</Text>
        <Text style={styles.h2}>have them delivered to your doorstep</Text>
        <Text style={styles.h2}>in little or no time.</Text>
      </View>
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'crimson',
  },
  logo: {
    alignItems: 'center',
  },
  img: {
    width: 355,
    height: 332,
  },
  body: {
    alignItems: 'center',
  },
  h1: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 28,
    lineHeight: 35,
    color: 'white',
    marginTop: 150,
  },
  h2: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: 'white',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  btn: {
    width: 227,
    height: 47,
    borderRadius: 34,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash;
