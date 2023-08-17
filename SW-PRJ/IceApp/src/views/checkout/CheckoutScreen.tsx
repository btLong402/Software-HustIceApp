import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import Spacer from '../../components/Spacer';
import Seperator from '../../components/Seperator';
import ShippingSegment from './ShippingSegment';
import MasterCardIcon from '../../assets/images/Mastercard_2019_logo.svg';
import * as yup from 'yup';
import {Formik, useFormik} from 'formik';
import {useAppSelector} from '../../redux/hook';
const cardInputValidationSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, 'Số thẻ tín dụng phải có 16 chữ số')
    .required('Số thẻ tín dụng là bắt buộc'),
  cardholderName: yup.string().required('Tên chủ thẻ là bắt buộc'),
  expirationDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Ngày hết hạn không hợp lệ')
    .required('Ngày hết hạn là bắt buộc'),
  cvv: yup
    .string()
    .matches(/^\d{3,4}$/, 'Mã CVV không hợp lệ')
    .required('Mã CVV là bắt buộc'),
});

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
            return (
              <Text style={{opacity: 0.9}} key={index}>
                {label}
              </Text>
            );
          } else
            return (
              <Text style={{opacity: 0.3}} key={index}>
                {label}
              </Text>
            );
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

const CardForm = () => {
  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      cardholderName: '',
      expirationDate: '',
      cvv: '',
    },
    validationSchema: cardInputValidationSchema,
    onSubmit: values => {
      Alert.alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <View>
      <Spacer height={10} />
      <PaymentInputTitle title={'Card Number'} />
      <Spacer height={5} />
      <TextInput
        placeholder="Số thẻ tín dụng"
        onChangeText={formik.handleChange('cardNumber')}
        onBlur={formik.handleBlur('cardNumber')}
        value={formik.values.cardNumber}
        style={{
          fontSize: 16,
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: '#f6f6f6',
        }}
      />
      <Spacer height={5} />
      {formik.touched.cardNumber && formik.errors.cardNumber && (
        <View style={styles.row}>
          <Icon name="error-outline" color={'red'} />
          <Text style={styles.errors}>{formik.errors.cardNumber}</Text>
        </View>
      )}
      <View style={StyleSheet.compose(styles.row, styles.jusitfyBetween)}>
        <View>
          <Spacer height={10} />
          <PaymentInputTitle title={'CVV/CVC'} />
          <Spacer height={5} />
          <TextInput
            placeholder="Mã CVV"
            onChangeText={formik.handleChange('cvv')}
            onBlur={formik.handleBlur('cvv')}
            value={formik.values.cvv}
            style={{
              fontSize: 16,
              paddingVertical: 15,
              paddingHorizontal: 20,
              backgroundColor: '#f6f6f6',
            }}
          />
          {formik.touched.cvv && formik.errors.cvv && (
            <View style={styles.row}>
              <Icon name="error-outline" color={'red'} />
              <Text style={styles.errors}>{formik.errors.cvv}</Text>
            </View>
          )}
        </View>
        <View>
          <Spacer height={10} />
          <PaymentInputTitle title={'Expiration Date'} />
          <Spacer height={5} />
          <TextInput
            placeholder="Ngày hết hạn (MM/YY)"
            onChangeText={formik.handleChange('expirationDate')}
            onBlur={formik.handleBlur('expirationDate')}
            value={formik.values.expirationDate}
            style={{
              fontSize: 16,
              paddingVertical: 15,
              paddingHorizontal: 20,
              backgroundColor: '#f6f6f6',
            }}
          />
          <Spacer height={5} />
          {formik.touched.expirationDate && formik.errors.expirationDate && (
            <View style={styles.row}>
              <Icon name="error-outline" color={'red'} />
              <Text style={styles.errors}>{formik.errors.expirationDate}</Text>
            </View>
          )}
        </View>
      </View>
      <Spacer height={10} />
      <PaymentInputTitle title={'Card Holder'} />
      <Spacer height={5} />
      <TextInput
        placeholder="Tên chủ thẻ"
        onChangeText={formik.handleChange('cardholderName')}
        onBlur={formik.handleBlur('cardholderName')}
        value={formik.values.cardholderName}
        style={{
          fontSize: 16,
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: '#f6f6f6',
        }}
      />
      <Spacer height={5} />

      {formik.touched.cardholderName && formik.errors.cardholderName && (
        <View style={styles.row}>
          <Icon name="error-outline" color={'red'} />
          <Text style={styles.errors}>{formik.errors.cardholderName}</Text>
        </View>
      )}
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
        <CardForm />
      </ScrollView>
    </View>
  );
};

const PriceSegment = () => {
  const {totalPrice, discount} = useAppSelector(state => state.orderCreate);
  return (
    <View style={priceContainer}>
      <View style={priceRow}>
        <Text style={localStyles.label}>Subtotal</Text>
        <Text style={localStyles.value}>{String(totalPrice)} VND</Text>
      </View>
      <Spacer height={10} />
      <View style={priceRow}>
        <Text style={localStyles.label}>Shipment Fees</Text>
        <Text style={localStyles.value}>15000 VND </Text>
      </View>
      <Spacer height={10} />
      <View style={priceRow}>
        <Text style={localStyles.label}>Product Discount</Text>
        <Text style={localStyles.value}>{String(discount * 100)}%</Text>
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
        <Text style={localStyles.value}>
          {String(totalPrice * (1 - discount) + 15000)} VND
        </Text>
      </View>
    </View>
  );
};
const foodContainer = StyleSheet.compose(styles.childContainer, {
  height: 250,
});

const priceRow = StyleSheet.compose(styles.row, {
  justifyContent: 'space-between',
});
const priceContainer = StyleSheet.compose(styles.childContainer, {
  flexShrink: 0,
});

const ProdSegment = () => {
  const {orderLines} = useAppSelector(state => state.orderCreate);
  return (
    <View style={foodContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {orderLines.map((line: OrderLine, index: number) => {
          return (
            <View key={index}>
              <View style={styles.row}>
                <Image
                  style={localStyles.prodImage}
                  source={{
                    uri: line.thumbnail,
                  }}
                />
                <View style={localStyles.prodInfo}>
                  <Text
                    style={localStyles.prodName}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {line.name} x {String(line.quantity)}
                  </Text>
                  <Text
                    style={localStyles.prodDesc}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    Des:
                  </Text>
                  <Text style={localStyles.prodPrice}>
                    {String(line.subTotal)} VND
                  </Text>
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

const SubmitSegment = () => {
  return (
    <View>
      <ProdSegment />
      <PriceSegment />
    </View>
  );
};
const CheckoutScreen = ({navigation}) => {
  const [screenIndex, setScreenIndex] = useState(0);
  const handleClickChangeScreen = screenIndex => {
    setScreenIndex(screenIndex);
  };
  const [disable, setDisable] = useState(false);
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
          <ShippingSegment navigation={navigation} setDisable={setDisable} />
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
          }}
          // disabled={disable}
        >
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
export default CheckoutScreen;
