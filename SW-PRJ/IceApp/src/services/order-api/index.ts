/* eslint-disable prettier/prettier */
import { Order } from '../../redux/order/orderSlice';
import {client} from '../client';
import {Alert} from 'react-native';
import {useAuth, AuthActionType} from '../../context/authContext';
export const getHistory = async (customerId: string) => {
  try {
    const response = await client.get(`/order/${customerId}/history`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createOrder = async ({order, cusId}) => {
  const newOrder: any = {
    customerId: cusId,
    orderLine: order.orderLines,
    shippingAddress: order.shippingInfo.address,
    total: order.totalPrice * (1 - order.discount) + 15000,
  };
  await client
    .post('/order/create-order', newOrder)
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
