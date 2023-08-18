import Spacer from '../../components/Spacer';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Box, CheckIcon, Select} from 'native-base';

import {localStyles, mainContainer} from './CheckoutScreen';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useUser} from '../../context/userContext';
import React, {useState} from 'react';
import {useAppDispatch} from '../../redux/hook';
import {ShippingInfo, updateShippingInfo} from '../../redux/order/orderSlice';
type Shipping = {
  navigation: any;
  setDisable: (boolean) => void;
  shippingInfo: any;
  handleShippingInfo: any;
  setIsValidIndex: (isValid: boolean) => void;
  screenIndex: number;
};
interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  handleShippingInfo: (key: string, value: string) => void;
  setIsValidIndex: (isValid: boolean) => void;
  screenIndex: number;
}

const ShippingForm = ({
  shippingInfo,
  handleShippingInfo,
  screenIndex,
  setIsValidIndex,
}: ShippingFormProps) => {
  const validationSchema = Yup.object().shape({
    receiverName: Yup.string().required('Receiver name is required'),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    province: Yup.string().required('Province is required'),
    address: Yup.string().required('Address is required'),
    shippingInstruction: Yup.string().required(
      'Shipping instruction is required',
    ),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={shippingInfo}
        validationSchema={validationSchema}
        onSubmit={() => {}}>
        {({handleChange, handleBlur, values, errors, touched, isValid}) => {
          const isEmpty = Object.values(values).every(x => x !== '');
          setIsValidIndex(screenIndex === 0 ? isValid && isEmpty : false);
          return (
            <View>
              <Text style={styles.label}>Contact</Text>
              <TextInput
                style={styles.input}
                placeholder="Receiver Name"
                onChangeText={value => {
                  handleChange('receiverName')(value);
                  handleShippingInfo('receiverName', value);
                }}
                onBlur={handleBlur('receiverName')}
                value={values.receiverName}
              />
              {errors.receiverName && touched.receiverName && (
                <Text style={styles.error}>{errors.receiverName}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={value => {
                  handleChange('phoneNumber')(value);
                  handleShippingInfo('phoneNumber', value);
                }}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <Text style={styles.error}>{errors.phoneNumber}</Text>
              )}
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={StyleSheet.compose(styles.input, {
                  backgroundColor: '#f6f6f6',
                  color: 'grey',
                  fontWeight: '500',
                })}
                placeholder="Province"
                editable={false}
                value="Hanoi"
              />
              {errors.province && touched.province && (
                <Text style={styles.error}>{errors.province}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Address"
                onChangeText={value => {
                  handleChange('address')(value);
                  handleShippingInfo('address', value);
                }}
                onBlur={handleBlur('address')}
                value={values.address}
              />
              {errors.address && touched.address && (
                <Text style={styles.error}>{errors.address}</Text>
              )}
              <Spacer height={10} />

              <Box>
                <Select
                  //@ts-ignore
                  selectedValue={values.shippingInstruction}
                  accessibilityLabel="Choose Shipping Instructions"
                  placeholder="Choose Shipping Instructions"
                  _selectedItem={{
                    bg: 'black.600',
                    endIcon: <CheckIcon size="3" />,
                  }}
                  style={{
                    height: 40,
                    //@ts-ignore
                    fontSize: 15,
                  }}
                  mt={1}
                  onValueChange={itemValue => {
                    handleChange('shippingInstruction')(itemValue);
                    handleShippingInfo('shippingInstruction', itemValue);
                  }}>
                  <Select.Item label="Pick up" value="Pick up" />
                  <Select.Item label="Delivery" value="Delivery" />
                </Select>
                {errors.shippingInstruction && touched.shippingInstruction && (
                  <Text style={styles.error}>{errors.shippingInstruction}</Text>
                )}
              </Box>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const ShippingSegment = (props: Shipping) => {
  console.log('shippingInfo: ', props.shippingInfo);
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
        <ShippingForm
          setIsValidIndex={props.setIsValidIndex}
          screenIndex={props.screenIndex}
          shippingInfo={props.shippingInfo}
          handleShippingInfo={props.handleShippingInfo}
        />
        <Spacer height={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    opacity: 0.5,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ShippingSegment;
