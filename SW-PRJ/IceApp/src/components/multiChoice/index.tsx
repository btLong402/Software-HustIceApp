/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch} from '../../redux/hook';
import {addNewTopping, deleteTopping} from '../../redux/order/orderSlice';
type RenderDataProps = {
  data: Array<{
    itemId: number;
    itemName: string;
    isChecked: boolean;
  }>;
  productId: number;
};

const RenderData = (props: RenderDataProps) => {
  const {data, productId} = props;
  const dispatch = useAppDispatch();
  const [toppingList, setToppingList] = useState<
    Array<{
      itemId: number;
      itemName: string;
      isChecked: boolean;
    }>
  >(data);
  const handlePress = (_item: {
    itemId: number;
    itemName: string;
    isChecked: boolean;
  }) => {
    if (_item.isChecked) {
      dispatch(deleteTopping({productId: productId, toppingId: _item.itemId}));
    } else {
      dispatch(addNewTopping({productId: productId, toppingId: _item.itemId}));
    }
    const index = toppingList.findIndex((t) => t.itemId === _item.itemId);
    let temp = !toppingList[index].isChecked;
    const newToppingList = [...toppingList];
    newToppingList[index].isChecked = temp;
    setToppingList(newToppingList);
  };
  return (
    <View>
      {toppingList.map((_item: any) => (
        <View key={_item.itemId} style={styles.card}>
          <Pressable onPress={() => handlePress(_item)} style={styles.row}>
            <Icon
              name={
                _item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'
              }
              size={24}
              color="gray"
              />
              <Text style={styles.h1}>{_item.itemName}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

type MultiCheckBoxProps = {
  title: string;
  data: Array<{
    itemId: number;
    itemName: string;
    isChecked: boolean;
  }>;
  productId: number;
};

export default function MultiCheckBox(props: MultiCheckBoxProps) {
  const {title, data, productId} = props;
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <RenderData data={data} productId={productId} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF2F2',
    borderRadius: 30,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  title: {},
  row:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  h1: {
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 4
  }
});
