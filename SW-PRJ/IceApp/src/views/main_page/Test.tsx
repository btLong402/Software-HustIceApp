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
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import {IconButton} from '@react-native-material/core';
import {CheckBox} from '@rneui/themed';
import {Divider} from '@react-native-material/core';
import {useAppSelector, useAppDispatch} from '../../redux/hook';
import MultiCheckBox from '../../components/multiChoice';
import {Size} from '../../redux/size/sizeSlice';
import {
  incrementQuantity,
  decrementQuantity,
  setSize,
} from '../../redux/order/orderSupportSlice';
import {useNavigation} from '@react-navigation/native';
import {deleteOrderLine, addNewOrderLine} from '../../redux/order/orderSlice';
import {useAuth} from '../../context/authContext';
function Test({route}: any) {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const dispatch = useAppDispatch();
  // const {productId, basePrice, size, thumbnail, toppingList} = useAppSelector(state => state.chooseProduct);
  const {product} = route.params;
  const {productId, basePrice, size, thumbnail, toppingList, name} = product;
  let {quantity, subTotal} = useAppSelector(state => state.orderLine.line);
  let {line} = useAppSelector(state => state.orderLine);
  const {isSignout} = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.navBar}>
          <IconButton
            icon={<Icon name="leftcircleo" size={30} color="black" />}
            onPress={() => {
              navigation.pop();
            }}
          />
          <View style={styles.box}>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
        <ImageBackground
          source={{
            uri: thumbnail,
          }}
          resizeMode="cover"
          style={styles.header}
        />
        <View style={styles.des}>
          <View style={styles.price}>
            <Text style={styles.h1}> {basePrice + size[0].price} VND</Text>
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
          <Text style={styles.title}>Choose Size</Text>
          {size.map((e: Size, i: number) => (
            <CheckBox
              key={i}
              title={`${e.size} + ${
                i === 0
                  ? `${e.price + basePrice} VND(Default)`
                  : `${e.price + basePrice} VND`
              }`}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={selectedIndex === i}
              onPress={() => {
                setSelectedIndex(i);
                dispatch(setSize(e));
              }}
              containerStyle={{backgroundColor: '#FFF2F2', borderRadius: 30}}
            />
          ))}
          <MultiCheckBox
            title={'Topping List'}
            data={toppingList}
            productId={productId}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={{color: 'white'}}>{String(subTotal)} VND</Text>
        <View style={styles.btn_quantity}>
          <IconButton
            icon={<Icon name="minus" size={16} color="white" />}
            onPress={() => dispatch(decrementQuantity())}
          />
          <Text style={{color: 'white'}}>{String(quantity)}</Text>
          <IconButton
            icon={<Icon name="plus" size={16} color="white" />}
            onPress={() => dispatch(incrementQuantity())}
          />
        </View>
        <TouchableOpacity
          style={styles.btn_buy_now}
          onPress={() => {
            if (!isSignout) {
              dispatch(addNewOrderLine(line));
              Alert.alert('Add to cart success!');
              navigation.pop();
            } else {
              Alert.alert(
                'Please sign in to order!',
                'Do you want to sign in now?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Ok',
                    onPress: () => navigation.push('SignIn'),
                  },
                ],
              );
            }
          }}>
          <Text style={styles.name}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  footer: {
    height: 67,
    width: 400,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 28,
    backgroundColor: '#f44336',
    marginBottom: 3,
    marginLeft: 6,
  },
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    height: 38,
    width: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.43)',
    borderRadius: 32,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: 'white',
    fontSize: 15,
    padding: 5,
  },
  btn_quantity: {
    width: 104,
    height: 31,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn_buy_now: {
    width: 76,
    height: 34,
    borderRadius: 6,
    backgroundColor: '#ff785b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Test;
