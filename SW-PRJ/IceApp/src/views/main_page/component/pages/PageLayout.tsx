/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, SafeAreaView, StyleSheet, View, Dimensions} from 'react-native';

import {AppBar, HStack, IconButton} from '@react-native-material/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
type PageProps = {
  children?: React.ReactNode;
  navigation: any;
};
const windowHeight = Dimensions.get('window').height;
const bodyHeight = windowHeight - 70; // Adjust the value as needed
const Page = (props: PageProps) => {
  const {children, navigation} = props;
  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View style={styles.container}>
          <AppBar
            title="Menu List"
            titleStyle={styles.h1}
            color="#E41E25"
            elevation={0}
            trailing={
              <HStack>
                <IconButton
                  icon={
                    <MaterialCommunityIcons
                      name="magnify"
                      color="white"
                      size={38}
                    />
                  }
                  onPress={() => navigation.navigate('Search')}
                />
                <IconButton
                  icon={<Image source={require('../products/cart.png')} />}
                />
              </HStack>
            }
            style={styles.hederBar}
          />
          <View style={styles.body}>{children}</View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#E41E25',
  },
  container: {
    alignItems: 'center',
    height: '100%',
  },
  header: {
    width: '100%',
    height: 220,
    alignItems: 'center',
  },
  cart: {
    marginTop: 20,
    marginLeft: 350,
  },
  h1: {
    fontWeight: '400',
    fontSize: 32,
    lineHeight: 41,
    color: 'white',
  },
  h2: {
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 20,
    color: 'white',
    marginVertical: 10,
  },
  search: {
    width: 232,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginVertical: 25,
  },
  search_input: {
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 20,
    color: '#5D5959',
    paddingTop: 10,
    flex: 1,
  },
  body: {
    backgroundColor: '#FCF3F1',
    width: '100%',
    height: bodyHeight,
  },
  hederBar: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  footer: {
    height: 20,
    width: '100%',
  },
});

export default Page;
