/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface OrderLine {
  productId: string;
  includedTopping: Array<{toppingId: string}>;
  size: string;
  quantity: number;
  subTotal: number;
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
};

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: initialState,
  reducers: {
    addNewOrderLine: (state, action: PayloadAction<OrderLine>) => {
      state.orderLines.push(action.payload);
    },
    deleteOrderLine: (state, action: PayloadAction<OrderLine>) => {
      const index = state.orderLines.findIndex(
        orderLine => orderLine.productId === action.payload.productId,
      );
      if (index !== -1) {
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
    addNewTopping: (
      state,
      action: PayloadAction<{productId: string; toppingId: string}>,
    ) => {
      const orderLineIndex = state.orderLines.findIndex(
        orderLine => orderLine.productId === action.payload.productId,
      );
      if (orderLineIndex !== -1) {
        state.orderLines[orderLineIndex].includedTopping?.push({
          toppingId: action.payload.toppingId,
        });
      }
    },
    deleteTopping: (
      state,
      action: PayloadAction<{productId: string; toppingId: string}>,
    ) => {
      const orderLineIndex = state.orderLines.findIndex(
        orderLine => orderLine.productId === action.payload.productId,
      );
      if (orderLineIndex !== -1) {
        const toppingIndex =
          state.orderLines[orderLineIndex].includedTopping.findIndex(
            topping => topping.toppingId === action.payload.toppingId,
          );
        if (
          toppingIndex !== -1
        ) {
          state.orderLines[orderLineIndex].includedTopping.splice(
            toppingIndex,
            1,
          );
        }
      }
    },
  },
});

export const {
  addNewOrderLine,
  updateDiscount,
  updateNote,
  updateOrderLine,
  deleteOrderLine,
  updateTime,
  addNewTopping,
  deleteTopping,
} = orderSlice.actions;

export default orderSlice.reducer;
