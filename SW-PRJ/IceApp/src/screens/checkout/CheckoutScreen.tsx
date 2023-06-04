import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Touchable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Spacer from '../../components/Spacer';
import Seperator from '../../components/Seperator';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';

const Circle = ({
  backgroundColor,
  borderWidth = 0,
  text = '',
  textColor,
  onClick = () => {},
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        height: 20,
        width: 20,
        borderRadius: 50,
        backgroundColor: backgroundColor,
        borderWidth: borderWidth,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: textColor,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const ProcessLine = ({screenIndex}) => {
  console.log(screenIndex);
  let percentage;
  if (screenIndex == 0) {
    percentage = 0;
  } else if (screenIndex == 1) {
    percentage = 50;
  } else if (screenIndex == 2) {
    percentage = 100;
  }
  return (
    <View
      style={{
        height: 8,
        width: '90%',
      }}>
      {/* <Circle backgroundColor={'crimson'} isAbsolute={true} /> */}
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'crimson',
          opacity: 0.2,
          borderRadius: 10,
          elevation: 4,
        }}
      />
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: percentage + '%',
          backgroundColor: 'crimson',
          borderRadius: 10,
          elevation: 4,
        }}
      />
    </View>
  );
};

const ProcessSegment = ({screenIndex}) => {
  return (
    <View style={localStyles.processContainer}>
      <ProcessLine screenIndex={screenIndex} />
    </View>
  );
};
const ShippingSegment = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectionIndex] = useState(null);
  const handleClick = index => {
    if (isSelected === false) {
      setIsSelected(true);
      setSelectionIndex(index);
    } else if (selectedIndex === index) {
      setIsSelected(false);
      setSelectionIndex(null);
    } else if (selectedIndex !== index) {
      setSelectionIndex(index);
    }
  };
  const shippingCircles = (
    <View style={{flex: 3}}>
      <ScrollView>
        {Array(10)
          .fill(0)
          .map((_, index) => {
            return (
              <View key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                      }}>
                      Pickup Point
                    </Text>
                    <Spacer height={5} />
                    <TouchableOpacity style={addressRow}>
                      <Ionicons name="location" size={20} color="black" />
                      <Spacer width={10} />
                      <Text
                        style={localStyles.address}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        Hai Ba Trung, Hanoi
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 11,
                      }}>
                      Free
                    </Text>
                    <TouchableOpacity style={{}}>
                      {isSelected && selectedIndex === index ? (
                        <Circle
                          backgroundColor={'crimson'}
                          text="✓"
                          textColor={'white'}
                          onClick={() => handleClick(index)}
                        />
                      ) : (
                        <Circle
                          backgroundColor={'white'}
                          borderWidth={1}
                          onClick={() => handleClick(index)}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <Spacer height={10} />
                <Seperator />
                <Spacer height={10} />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );

  return (
    <View style={mainContainer}>
      <Text style={localStyles.header}>Shipping Address</Text>
      <Spacer height={20} />
      <View
        style={{
          paddingLeft: 10,
          flex: 1,
          alignItems: 'center',
        }}>
        {shippingCircles}
        <Spacer height={30} />
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'crimson',
            borderWidth: 2,
            borderRadius: 20,
            width: '80%',
            opacity: 0.9,
            borderStyle: 'dashed',
          }}>
          <Ionicons
            name="add-circle-outline"
            size={50}
            color="black"
            style={{
              opacity: 0.8,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
            }}>
            Add New Address
          </Text>
        </TouchableOpacity>
        <Spacer height={10} />
      </View>
    </View>
  );
};

const PaymentSegment = () => {
  return (
    <View style={mainContainer}>
      <Text>PaymentScreen</Text>
    </View>
  );
};

const SubmitSegment = () => {
  return (
    <View style={mainContainer}>
      <Text>SubmitScreen</Text>
    </View>
  );
};
const CheckoutScreen = ({navigation}) => {
  const [screenIndex, setScreenIndex] = useState(0);

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
      title: 'Checkout',
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
        {/* <Circle /> */}
        {/* <ProcessLine /> */}
        <ProcessSegment screenIndex={screenIndex} />
        <Spacer height={30} />
        {screenIndex === 0 ? (
          <ShippingSegment />
        ) : screenIndex == 1 ? (
          <PaymentSegment />
        ) : (
          <SubmitSegment />
        )}
        <Spacer height={30} />
        <TouchableOpacity
          onPress={() => {
            if (screenIndex < 2) setScreenIndex(screenIndex + 1);
            else navigation.navigate('Home');
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </View>
        </TouchableOpacity>
        <Spacer height={5} />
      </SafeAreaView>
    </View>
  );
};

const addressRow = StyleSheet.compose(styles.row, {
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const mainContainer = StyleSheet.compose(styles.childContainer, {
  flex: 1,
});
const localStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
  },
  header: {
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 18,
  },
  addressRow: {},
  address: {
    fontSize: 15,
    width: '90%',
  },
  processContainer: {
    alignItems: 'center',
  },
});
export default CheckoutScreen;
