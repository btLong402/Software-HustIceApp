/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Section from './component/Section';

interface Data {
  id: number;
  title: string;
  point: number;
  rate: number;
  price: number;
  dead: string;
  url: string;
}

const data: Data[] = [
  {
    id: 0,
    title: 'Main Dishes',
    point: 4.9,
    rate: 355,
    price: 2500,
    dead: 'FREE TOPPING',
    url: require('./component/products/sumptous1.png'),
  },
  {
    id: 1,
    title: 'Best Sellers',
    point: 4.8,
    rate: 105,
    price: 2000,
    dead: '',
    url: require('./component/products/Baked-Jollof-Rice.png'),
  },
  {
    id: 2,
    title: 'Discounted Offers',
    point: 4.6,
    rate: 500,
    price: 500,
    dead: '',
    url: require('./component/products/image2.png'),
  },
  {
    id: 3,
    title: 'Meal Plans',
    point: 5.0,
    rate: 205,
    price: 30000,
    dead: '',
    url: require('./component/products/image2.png'),
  },
];

const DataSection = () => {
  return (
    <>
      {data.map((item, index) => (
        <Section
          title={item.title}
          point={item.point}
          rate={item.rate}
          price={item.price}
          dead={item.dead}
          url={item.url}
          key={item.id}
        />
      ))}
    </>
  );
};

function MainScreen({navigation}) {
  return (
    <SafeAreaView>
      <ScrollView style={styles.background}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('Cart')}>
            <Image source={require('../../assets/images/cart.png')} />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.h1}>Menu</Text>
            <Text style={styles.h2}>Homemade meals prepared with love.</Text>
            <Text style={styles.h2}>Richest ingredients.</Text>
            <View style={styles.search}>
              <Image source={require('../../assets/images/loop.png')} />
              <TextInput
                style={styles.search_input}
                placeholder="Search Menu"
              />
            </View>
          </View>
          <View style={styles.body}>
            <DataSection />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#E41E25',
  },
  container: {
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 320,
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
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    alignItems: 'center',
  },
});

export default MainScreen;
