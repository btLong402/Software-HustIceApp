/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Topping} from '../topping/toppingSlice';

export interface OrderLine {
  productId: string;
  includedTopping: Array<{toppingId: string}>;
  size?: string;
  quantity: number;
  subTotal: number;
  thumbnail: string;
  name: string;
}

export interface Order {
  orderId: number;
  orderLines: Array<OrderLine>;
  note: string;
  status: string;
  isPaid: boolean;
  totalPrice: number;
  discount: number;
  createAt: number;
  shippingInfo: ShippingInfo;
}

export interface ShippingInfo {
  receiverName: string | null;
  phoneNumber: string | null;
  address: string | null;
  province: string | null;
  shippingInstruction: string | null;
}

const initialState: Order = {
  orderId: 0,
  orderLines: [],
  note: '',
  status: '',
  isPaid: false,
  totalPrice: 0,
  discount: 0,
  createAt: 0,
  shippingInfo: {
    receiverName: null,
    phoneNumber: null,
    address: null,
    province: null,
    shippingInstruction: null,
  },
};

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: initialState,
  reducers: {
    addNewOrderLine: (state, action: PayloadAction<OrderLine>) => {
      const index = state.orderLines.findIndex(
        orderLine => orderLine.productId === action.payload.productId,
      );
      if (index !== -1) {
        state.totalPrice +=
          action.payload.subTotal - state.orderLines[index].subTotal;
        state.orderLines[index] = action.payload;
      } else {
        state.orderLines.push(action.payload);
        state.totalPrice += action.payload.subTotal;
      }
    },
    deleteOrderLine: (state, action: PayloadAction<{productId: string}>) => {
      const index = state.orderLines.findIndex(
        orderLine => orderLine.productId === action.payload.productId,
      );
      if (index !== -1) {
        state.totalPrice -= state.orderLines[index].subTotal;
        state.orderLines.splice(index, 1);
      }
    },
    updateOrderLine: (state, action: PayloadAction<OrderLine>) => {
      const index = state.orderLines.findIndex(
        orderLine => orderLine.productId === action.payload.productId,
      );
      if (index !== -1) {
        state.orderLines[index] = action.payload;
      }
    },
    updateNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },
    updateDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    updateTime: (state, action: PayloadAction<number>) => {
      state.createAt = action.payload;
    },
    updateShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
    },
    clear : (state) => {
      state = initialState;
    }
  },
});

export const {
  addNewOrderLine,
  updateDiscount,
  updateNote,
  updateOrderLine,
  deleteOrderLine,
  updateShippingInfo,
  updateTime,
  clear
} = orderSlice.actions;

export default orderSlice.reducer;
