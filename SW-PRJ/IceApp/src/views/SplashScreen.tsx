/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
function Splash(): JSX.Element {
  const handleClick = () => {};
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
        {/* <TouchableOpacity style={styles.btn}>
          <Image source={require('../assets/images/Vector.png')} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
