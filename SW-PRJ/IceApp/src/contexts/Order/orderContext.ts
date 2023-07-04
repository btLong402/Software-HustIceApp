/* eslint-disable prettier/prettier */
import {createContext, useContext, useReducer} from 'react';

export interface OrderLine {
  productId: number;
  includedTopping?: Array<{toppingId: number}>;
  subTotal: number;
}

export interface Order {
  orderId: number;
  orderLines: Array<OrderLine>;
  note: string;
  status: number;
  isPaid: boolean;
  totalPrice: number;
  discount: number;
}

const OrderContext = createContext(null);

const OrderDispatchContext = createContext(null);

