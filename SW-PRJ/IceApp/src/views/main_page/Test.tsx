/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import {IconButton} from '@react-native-material/core';
import {CheckBox} from '@rneui/themed';
import {Divider} from '@react-native-material/core';
import MultiCheckBox from '../../components/multiChoice';
const FakeTp = [
  {
    targetNUmberL: '50%',
  },
  {
    targetNUmberL: '100%',
  },
];

type Data = {
  title: string;
  item: Array<{
    itemId: number;
    itemName: string;
    isChecked: boolean;
  }>;
};
const fakeData: Data = {
  title: 'Shopping List',
  item: [
    {
      itemId: 1,
      itemName: 'Apples',
      isChecked: false,
    },
    {
      itemId: 2,
      itemName: 'Milk',
      isChecked: false,
    },
    {
      itemId: 3,
      itemName: 'Bread',
      isChecked: false,
    },
    {
      itemId: 4,
      itemName: 'Eggs',
      isChecked: false,
    },
    {
      itemId: 5,
      itemName: 'Cheese',
      isChecked: false,
    },
  ],
};

const Test = ({navigation} : any) => {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <IconButton
          icon={<Icon name="leftcircleo" size={30} color="black" />}
          onPress={() => navigation.goBack()}
        />
        <ImageBackground
          source={require('./component/products/how-to-prepare-Nigerian-fried-rice.png')}
          resizeMode="cover"
          style={styles.header}
        />
        <View style={styles.des}>
          <View style={styles.price}>
            <Text style={styles.h1}> 25000 VND</Text>
          </View>
          <View style={styles.textField}>
            <Text style={styles.title}>Description</Text>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
              nobis nihil omnis, reiciendis ducimus non ut qui enim perferendis
              dicta! Accusamus distinctio numquam natus, tenetur ipsam commodi
              nobis? Inventore, voluptatem?
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>Description</Text>
          {FakeTp.map((e, i) => (
            <CheckBox
              key={i}
              title={e.targetNUmberL}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={selectedIndex === i + 1}
              onPress={() => setSelectedIndex(i + 1)}
              containerStyle={{backgroundColor: '#FFF2F2', borderRadius: 30}}
            />
          ))}
          <Text style={styles.title}>Description</Text>
          {FakeTp.map((e, i) => (
            <CheckBox
              key={i}
              title={e.targetNUmberL}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={selectedIndex === i + 1}
              onPress={() => setSelectedIndex(i + 1)}
              containerStyle={{backgroundColor: '#FFF2F2', borderRadius: 30}}
            />
          ))}
          <Text style={styles.title}>Description</Text>
          {FakeTp.map((e, i) => (
            <CheckBox
              key={i}
              title={e.targetNUmberL}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={selectedIndex === i + 1}
              onPress={() => setSelectedIndex(i + 1)}
              containerStyle={{backgroundColor: '#FFF2F2', borderRadius: 30}}
            />
          ))}
          <MultiCheckBox
            title={fakeData.title}
            data={fakeData.item}
            productId={1}
          />
        </View>
      </ScrollView>
      <Divider leadingInset={28} trailingInset={28} style={styles.divider} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    fontSize: 16,
    marginVertical: 5,
  },
  header: {
    width: '100%',
    height: 467,
  },
  price: {
    width: 170,
    height: 50,
    borderRadius: 32,
    marginVertical: -22,
    backgroundColor: '#F47B7B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 190,
  },
  h1: {
    fontSize: 24,
    fontWeight: '400',
    color: '#5D5959',
  },
  des: {
    width: '100%',
    height: 170,
    borderRadius: 30,
    backgroundColor: '#FFF2F2',
    alignItems: 'center',
    marginVertical: -9,
  },
  textField: {
    width: '80%',
    height: '60%',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#5E5959',
  },
  body: {
    width: '100%',
    marginTop: 20,
  },
  divider: {
    height: 50,
    borderRadius: 4,
    marginTop: 10,
  },
});

export default Test;
