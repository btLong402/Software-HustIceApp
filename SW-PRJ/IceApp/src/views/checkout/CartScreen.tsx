import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spacer from '../../components/Spacer';
import Seperator from '../../components/Seperator';
import styles from './styles';
import {Image} from 'react-native';

const PriceSegment = () => {
  return (
    <View style={priceContainer}>
      <View style={priceRow}>
        <Text style={localStyles.label}>Subtotal</Text>
        <Text style={localStyles.value}>$100</Text>
      </View>
      <Spacer height={10} />
      <View style={priceRow}>
        <Text style={localStyles.label}>Tax & Fees</Text>
        <Text style={localStyles.value}>$10</Text>
      </View>
      <Spacer height={10} />
      <View style={priceRow}>
        <Text style={localStyles.label}>Product Discount</Text>
        <Text style={localStyles.value}>-$0</Text>
      </View>
      <Spacer height={10} />
      <Seperator />
      <Spacer height={10} />
      <View style={priceRow}>
        <Text
          style={
            (localStyles.label,
            {fontSize: 20, fontWeight: 'bold', letterSpacing: 0.9})
          }>
          Total
        </Text>
        <Text style={localStyles.value}>$ 110</Text>
      </View>
    </View>
  );
};
const ProdSegment = () => {
  return (
    <View style={foodContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Array(4)
          .fill(0)
          .map((_, index) => {
            return (
              <View key={index}>
                <View style={styles.row}>
                  <Image
                    style={localStyles.prodImage}
                    source={{
                      uri: 'https://tea-3.lozi.vn/v1/ship/resized/test-huongg-lam-dong-1637048248725161849-supper-sundae-dau-tay-0-1680061286?w=640&type=o',
                    }}
                  />
                  <View style={localStyles.prodInfo}>
                    <Text
                      style={localStyles.prodName}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      Supper Sundae Dâu Tây x 2
                    </Text>
                    <Text
                      style={localStyles.prodDesc}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      Kem + Mứt dâu tây
                    </Text>
                    <Text style={localStyles.prodPrice}>$ 100</Text>
                  </View>
                </View>
                <Spacer height={15} />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

const CheckoutScreen = ({navigation}) => {
  useEffect(() => {
    const headerLeft = () => (
      <Ionicons
        name="arrow-back"
        size={30}
        color="white"
        style={{marginLeft: 10}}
        onPress={() => {
          navigation.goBack();
        }}
      />
    );
    navigation.setOptions({
      title: 'Cart Details',
      headerLeft: headerLeft,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'crimson',
      },
      headerTitleStyle: {
        fontSize: 20, // set the font size of the header title to 20
        fontWeight: 500, // set the font weight of the header title to bold
        letterSpacing: 1, // set the letter spacing to 0.5
      },
    });
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <PriceSegment />
        <Spacer height={30} />
        <ProdSegment />
        <Spacer height={30} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Checkout');
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Checkout</Text>
          </View>
        </TouchableOpacity>
        <Spacer height={5} />
      </SafeAreaView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  prodImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    flex: 1,
  },
  prodInfo: {
    paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 2,
  },
  prodName: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.9,
  },
  prodDesc: {
    fontSize: 14,
    opacity: 0.7,
  },
  prodPrice: {
    fontSize: 18,
    fontWeight: '500',
    opacity: 0.9,
    color: 'crimson',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    opacity: 0.9,
  },
  value: {
    fontSize: 18,
    opacity: 0.7,
  },
});

const priceRow = StyleSheet.compose(styles.row, {
  justifyContent: 'space-between',
});
const priceContainer = StyleSheet.compose(styles.childContainer, {
  flexShrink: 0,
});

const foodContainer = StyleSheet.compose(styles.childContainer, {
  flex: 3,
});

export default CheckoutScreen;
