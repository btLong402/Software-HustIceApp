/* eslint-disable prettier/prettier */
import {Order} from '../../redux/order/orderSlice';
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
  let orderLine = [];
  for (let i of order.orderLine) {
    orderLine.push({
      productId: i.productId,
      includedTopping: i.includedTopping,
      size: i.size,
      quantity: i.quantity,
      subtotal: i.subtotal,
    });
  }
  const total =
    order.shippingInfo.shippingInstruction === 'Delivery'
      ? order.totalPrice * (1 - order.discount) + 15000
      : order.totalPrice * (1 - order.discount);
  const newOrder: any = {
    customerId: cusId,
    orderLine: orderLine,
    shippingAddress: order.shippingInfo.address,
    shippingMethod: order.shippingInfo.shippingInstruction,
    total: total,
  };
  console.log('🚀 ~ file: index.ts:28 ~ createOrder ~ newOrder:', newOrder);
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
