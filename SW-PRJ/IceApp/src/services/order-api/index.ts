/* eslint-disable prettier/prettier */
import {client} from '../client';
import {Alert} from 'react-native';
export const getHistory = async (customerId: string) => {
  try {
    const response = await client.get(`/order/${customerId}/history`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createOrder = async (order: any) => {
  await client
    .post('/order/create-order', order)
    .then(res => {
      if (res.status === 200) {
        Alert.alert('Order created successfully');
      } else {
        Promise.reject();
      }
    })
    .catch(err => Alert.alert(`${err}`));
};

export const updateStatusOrder = async (orderId: string, status: string) => {
  await client
    .put(`/order/${orderId}/`, status)
    .then(res => {
      if (status === 'cancelled' && res === 200) {
        Alert.alert('Order cancelled successfully');
      } else {
        Promise.reject();
      }
    })
    .catch(err => Alert.alert(`${err}`));
};
