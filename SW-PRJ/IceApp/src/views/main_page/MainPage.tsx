/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Section from './component/pages/Section';
import {DataSection, Item} from './component/pages/DataModal';
import Page from './component/pages/PageLayout';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {Divider} from '@react-native-material/core';
import {Modal, NativeBaseProvider} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppSelector} from '../../redux/hook';
import {getData} from '../../utils/index';

type RenderItemProps = {
  item: Item;
  handleClick: () => void;
};

const RenderItem = (props: RenderItemProps) => {
  const {item, handleClick} = props;
  return (
    <Pressable style={styles.item} onPress={() => handleClick()}>
      <Image
        source={{
          uri: item.thumbnail,
        }}
        style={styles.img}
        // source={thumbnail}
      />
      <View style={styles.right}>
        <Text style={styles.h1}>{item.name}</Text>
        <Text style={styles.h2}>{item.basePrice}</Text>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="plus-circle" color="red" size={30} />
        </View>
      </View>
    </Pressable>
  );
};
function MainPage({navigation}: any) {
  const ref1 = useRef<FlatList>(null);
  const [i, setI] = useState(0);
  const {categoryList} = useAppSelector(state => state.categoryList);
  const {productList} = useAppSelector(state => state.productList);
  useEffect(() => {
    if (!ref1.current) return;
    ref1.current?.scrollToIndex({
      index: i,
      animated: true,
      viewPosition: 0,
    });
  }, [i]);
  const Data: DataSection[] = getData(productList, categoryList);
  // console.log('🚀 ~ file: MainPage.tsx:66 ~ MainPage ~ Data:', Data[0].title, Data[0].products);
  const handleClick = () => {
    navigation.navigate('Test');
  };
  const [visible, setVisible] = useState(false);
  return (
    <NativeBaseProvider>
      <Page navigation={navigation}>
        <FlatList
          ref={ref1}
          initialScrollIndex={i}
          data={Data}
          keyExtractor={(item: DataSection, index: number) =>
            item.title + index
          }
          style={{flexGrow: 0}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 20}}
          renderItem={({item: {title, products}}) =>
            products.length !== 0 ? (
              <Section title={title}>
                {products.map((p: Item, id: number) => (
                  <RenderItem item={p} handleClick={handleClick} key={id} />
                ))}
                <Divider
                  leadingInset={28}
                  trailingInset={28}
                  style={styles.divider}
                />
              </Section>
            ) : null
          }
        />
        <Pressable
          onPress={() => setVisible(true)}
          style={{marginVertical: -100, marginHorizontal: 20}}>
          <View>
            <Icon name="md-list-circle-sharp" color="red" size={50} />
          </View>
        </Pressable>
        <Menu
          visible={visible}
          setVisible={() => setVisible(false)}
          titleList={Data}
          setI={setI}
        />
      </Page>
    </NativeBaseProvider>
  );
}

type MenuProps = {
  visible: boolean;
  setVisible: () => void;
  titleList: DataSection[];
  setI: (i: number) => void;
};

const Menu = (props: MenuProps) => {
  const {visible, setVisible, titleList, setI} = props;
  return (
    <Modal isOpen={visible} onClose={setVisible}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Menu</Modal.Header>
        <Modal.Body>
          {titleList.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setI(index);
                setVisible();
              }}
              key={index}>
              <Text style={styles.h1}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
const styles = StyleSheet.create({
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
  icon: {
    marginTop: 6,
  },
  divider: {
    height: 4,
    borderRadius: 4,
  },
});
export default MainPage;
