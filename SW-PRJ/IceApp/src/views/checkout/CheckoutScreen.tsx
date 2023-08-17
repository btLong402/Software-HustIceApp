import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Spacer from '../../components/Spacer';
import Seperator from '../../components/Seperator';
import ShippingSegment from './ShippingSegment';

const Circle = ({
  backgroundColor,
  borderWidth = 0,
  text = '',
  textColor = 'black',
  opacity = 1,
  onClick = () => {},
}) => {
  return (
    <View
      style={{
        backgroundColor: '#f6f6f6',
        borderRadius: 50,
      }}>
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
          opacity: opacity,
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
    </View>
  );
};

const ProcessLine = ({screenIndex}) => {
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
        width: '100%',
        position: 'absolute',
        top: 6,
        elevation: 4,
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

const ProcessSegment = ({screenIndex, onClick}) => {
  const handleProcessCirleClick = index => {
    if (index < screenIndex) {
      onClick(index);
    }
  };
  const processArray = ['Shipping', 'Payment', 'Submit'];
  const processCircles = processArray.map((label, index) => {
    if (index < screenIndex) {
      return (
        <Circle
          backgroundColor={'crimson'}
          text={'✓'}
          textColor={'white'}
          key={index}
          onClick={() => handleProcessCirleClick(index)}
        />
      );
    } else if (index === screenIndex) {
      return (
        <Circle
          backgroundColor={'crimson'}
          key={index}
          onClick={() => handleProcessCirleClick(index)}
        />
      );
    } else {
      return (
        <Circle
          backgroundColor={'crimson'}
          opacity={0.2}
          key={index}
          onClick={() => handleProcessCirleClick(index)}
        />
      );
    }
  });
  return (
    <View>
      <View style={localStyles.processContainer}>
        <ProcessLine screenIndex={screenIndex} />
        {processCircles}
      </View>
      <Spacer height={5} />
      <View style={localStyles.processContainer}>
        {processArray.map((label, index) => {
          if (index <= screenIndex) {
            return <Text style={{opacity: 0.9}}>{label}</Text>;
          } else return <Text style={{opacity: 0.3}}>{label}</Text>;
        })}
      </View>
    </View>
  );
};

const PaymentCard = () => {
  return (
    <View style={localStyles.card}>
      <Image source={require('../../assets/images/Google.png')} />
    </View>
  );
};

const PaymentInputTitle = ({title}) => {
  return (
    <Text
      style={{
        fontSize: 16,
        fontWeight: '500',
      }}>
      {title}
    </Text>
  );
};

const PaymentInput = ({title}) => {
  return (
    <View>
      <Spacer height={10} />
      <PaymentInputTitle title={title} />
      <Spacer height={5} />
      <TextInput
        placeholder="Card Number"
        // leftIcon={<Ionicons name="card-outline" size={24} color="black" />}
        style={{
          fontSize: 16,
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: '#f6f6f6',
        }}
      />
      <Spacer height={5} />
    </View>
  );
};
const PaymentSegment = () => {
  return (
    <View style={mainContainer}>
      <Text style={localStyles.header}>Add Payment Method</Text>
      <Spacer height={10} />
      <View style={StyleSheet.compose(styles.row, styles.jusitfyBetween)}>
        {Array(3)
          .fill(0)
          .map((_, index) => {
            return <PaymentCard key={index} />;
          })}
      </View>
      <Spacer height={20} />
      <ScrollView>
        <PaymentInput title="Card Number" />
        {/* <Spacer height={20} /> */}
        <View style={StyleSheet.compose(styles.row, styles.jusitfyBetween)}>
          <PaymentInput title="CVV/CVC" />
          <PaymentInput title="Expiration Date" />
        </View>
        <PaymentInput title="Card Holder Name" />
      </ScrollView>
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
  const handleClickChangeScreen = screenIndex => {
    setScreenIndex(screenIndex);
  };

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
        <ProcessSegment
          screenIndex={screenIndex}
          onClick={handleClickChangeScreen}
        />
        <Spacer height={30} />
        {screenIndex === 0 ? (
          <ShippingSegment navigation={navigation} />
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

export const mainContainer = StyleSheet.compose(styles.childContainer, {
  flex: 1,
  minHeight: 200,
});
export const localStyles = StyleSheet.create({
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
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999999',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 5,
    paddingVertical: 5,
  },
});
export default CheckoutScreen;
