/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch} from '../../redux/hook';
import {addNewTopping, deleteTopping} from '../../redux/order/orderSupportSlice';
import { Topping } from '../../redux/topping/toppingSlice';
type RenderDataProps = {
  data: Array<{
    topping: Topping;
    itemName: string;
    isChecked: boolean;
  }>;
};

const RenderData = (props: RenderDataProps) => {
  const {data} = props;
  const dispatch = useAppDispatch();
  const [toppingList, setToppingList] = useState<
    Array<{
      topping: Topping;
      itemName: string;
      isChecked: boolean;
    }>
  >(data);
  const handlePress = (_item: {
    topping: Topping;
    itemName: string;
    isChecked: boolean;
  }) => {
    if (_item.isChecked) {
      dispatch(deleteTopping(_item.topping));
    } else {
      dispatch(addNewTopping(_item.topping));
    }
    const index = toppingList.findIndex(t => t.topping.toppingId === _item.topping.toppingId);
    let temp = !toppingList[index].isChecked;
    const newToppingList = [...toppingList];
    newToppingList[index].isChecked = temp;
    setToppingList(newToppingList);
  };
  return (
    <View>
      {toppingList.map(
        (_item: {topping: Topping; itemName: string; isChecked: boolean}) => (
          <View key={_item.topping.toppingId} style={styles.card}>
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
        ),
      )}
    </View>
  );
};

type MultiCheckBoxProps = {
  title: string;
  data: Topping[];
  productId: string;
};

export default function MultiCheckBox(props: MultiCheckBoxProps) {
  const {title, data, productId} = props;
  const newData: Array<{
    topping: Topping;
    itemName: string;
    isChecked: boolean;
  }> = data.map(d => ({
    topping: d,
    itemName: `${d.name} + ${d.price} VND`,
    isChecked: false,
  }));
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <RenderData data={newData}/>
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#5E5959',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  h1: {
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 4,
  },
});
