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

type Shipping = {
  navigation: any;
  setDisable: (boolean) => void;
};

const ShippingForm = ({userInfo}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  console.log('userInfo, ', userInfo);
  const initialValues = {
    receiverName: userInfo.fullname,
    phoneNumber: userInfo.phoneNumber,
    province: '',
    address: '',
    shippingInstruction: '',
  };

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

  const handleSubmit = values => {
    // Handle form submission logic here
    console.log(values);
  };
  const [service, setService] = React.useState('');

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          // <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.label}>Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Receiver Name"
              onChangeText={handleChange('receiverName')}
              onBlur={handleBlur('receiverName')}
              value={values.receiverName}
            />
            {errors.receiverName && touched.receiverName && (
              <Text style={styles.error}>{errors.receiverName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              onChangeText={handleChange('phoneNumber')}
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
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
            />
            {errors.address && touched.address && (
              <Text style={styles.error}>{errors.address}</Text>
            )}
            <Spacer height={10} />

            <Box>
              <Select
                selectedValue={values.shippingInstruction}
                accessibilityLabel="Choose Shipping Instructions"
                placeholder="Choose Shipping Instructions"
                _selectedItem={{
                  bg: 'black.600',
                  endIcon: <CheckIcon size="3" />,
                }}
                style={{
                  height: 40,
                  fontSize: 15,
                }}
                mt={1}
                onValueChange={itemValue =>
                  handleChange('shippingInstruction')(itemValue)
                }>
                <Select.Item label="Pick up" value="Pick up" />
                <Select.Item label="Delivery" value="Delivery" />
              </Select>
              {errors.shippingInstruction && touched.shippingInstruction && (
                <Text style={styles.error}>{errors.shippingInstruction}</Text>
              )}
            </Box>

            {/* <Button onPress={handleSubmit} title="Submit" /> */}
          </View>
        )}
      </Formik>
    </View>
  );
};

const ShippingSegment = (props: Shipping) => {
  const {user: userInfo} = useUser();

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
        <ShippingForm userInfo={userInfo} />
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
