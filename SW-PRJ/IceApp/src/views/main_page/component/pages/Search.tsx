/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../../../../redux/hook';
import {Product} from '../../../../redux/product/productSlice';
import {IconButton} from '@react-native-material/core';
import {
  Choose,
  createNewOrderLine,
} from '../../../../redux/order/orderSupportSlice';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
type RenderItemProps = {
  name: string;
  thumbnail: string;
  basePrice: number;
  handleClick: () => void;
};

const RenderItem = (props: RenderItemProps) => {
  const {name, thumbnail, basePrice, handleClick} = props;
  return (
    <Pressable style={styles.item} onPress={() => handleClick()}>
      <Image
        source={{
          uri: thumbnail,
        }}
        style={styles.img}
        // source={thumbnail}
      />
      <View style={styles.right}>
        <Text style={styles.h1}>{name}</Text>
        <Text style={styles.h2}>{basePrice}</Text>
      </View>
    </Pressable>
  );
};

export default function Search({route}: any) {
  const [searchInput, setSearchInput] = useState<string>('');
  const navigation = useNavigation();
  const [filter, setFilter] = useState<Set<Choose>>(new Set());
  const {productList} = useAppSelector(state => state.productList);
  const {data} = route.params;
  const dispatch = useAppDispatch();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const filterData = () => {
    if (searchInput && data.length !== 0) {
      let check: Map<string, boolean> = new Map();
      const filteredItems = productList.filter(item => {
        const itemName = item.name ? item.name.toUpperCase() : '';
        const textInput = searchInput.toUpperCase();
        return itemName.includes(textInput);
      });
      let newFilteredSet: Set<Choose> = new Set();
      for (let i of filteredItems) {
        for (let t of data) {
          for (let m of t.products)
            if (m.productId === i.productId) {
              if (check.has(m.productId) === false) {
                newFilteredSet.add(m);
                check.set(m.productId, true);
              }
            }
        }
      }
      setFilter(newFilteredSet);
    } else {
      setFilter(new Set());
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(filterData, 300);
    return () => clearTimeout(timeoutId);
  }, [searchInput]);
  const handleClick = (p: Choose) => {
    dispatch(createNewOrderLine(p));
    navigation.push('Test', {product: p});
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: 'white'}}>
        {/* <IconButton
          icon={<Icon name="leftcircleo" size={30} color="black" />}
          onPress={() => navigation.navigate('MyTabs')}
        /> */}
        <TextInput
          style={styles.textInputStyle}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
          value={searchInput}
          onChangeText={text => {
            if (text.length != 0) {
              setSearchInput(text);
              setIsSearch(true);
            } else {
              setSearchInput(text);
              setIsSearch(false);
            }
          }}
        />
        {filter.size != 0 ? (
          <FlatList
            data={Array.from(filter)}
            keyExtractor={(item: Choose, index: number) =>
              item.productId + index
            }
            style={{flexGrow: 0}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: 20}}
            renderItem={({item}) => {
              return (
                <RenderItem
                  key={item.productId}
                  name={item.name}
                  thumbnail={item.thumbnail}
                  basePrice={item.basePrice}
                  handleClick={() => handleClick(item)}
                />
              );
            }}
          />
        ) : (
          isSearch === true && (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text>No options</Text>
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  item: {
    width: '100%',
    height: 122,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  img: {
    width: 122,
    height: '100%',
    borderRadius: 14,
  },
  h1: {
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 20,
    color: 'black',
  },
  h2: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
    color: 'black',
  },
  right: {
    padding: 5,
  },
});
