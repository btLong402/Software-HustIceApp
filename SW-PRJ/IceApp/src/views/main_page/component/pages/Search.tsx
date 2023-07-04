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
import {useAppSelector} from '../../../../redux/hook';
import {Product} from '../../../../redux/product/productSlice';
import {IconButton} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/AntDesign';
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

export default function Search({navigation}: any) {
  const [searchInput, setSearchInput] = useState<string>('');
  const [filter, setFilter] = useState<Product[]>([]);
  const {productList} = useAppSelector(state => state.productList);
  const filterData = () => {
    if (searchInput) {
      const filteredItems = productList.filter(item => {
        const itemName = item.name ? item.name.toUpperCase() : '';
        const textInput = searchInput.toUpperCase();
        return itemName.includes(textInput);
      });
      setFilter(filteredItems);
    } else {
      setFilter([]);
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(filterData, 300);
    return () => clearTimeout(timeoutId);
  }, [searchInput]);
  const handleClick = () => {
    navigation.navigate('Test');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: 'white'}}>
        <IconButton
          icon={<Icon name="leftcircleo" size={30} color="black" />}
          onPress={() => navigation.navigate('MyTabs')}
        />
        <TextInput
          style={styles.textInputStyle}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
          value={searchInput}
          onChangeText={text => setSearchInput(text)}
        />
        <FlatList
          data={filter}
          keyExtractor={(item: Product, index: number) =>
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
                thumbnail={item.image}
                basePrice={item.basePrice}
                handleClick={handleClick}
              />
            );
          }}
        />
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
