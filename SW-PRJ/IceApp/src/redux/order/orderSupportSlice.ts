import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Size} from '../size/sizeSlice';
import {Topping} from '../topping/toppingSlice';
import {OrderLine} from './orderSlice';
export interface Choose {
  productId: string;
  basePrice: number;
  name: string;
  thumbnail: string;
  size: Array<Size>;
  toppingList: Array<Topping>;
}

const initialState: {line: OrderLine, tmp: number} = {
  line: {
    productId: '',
    includedTopping: [],
    quantity: 1,
    subTotal: 0,
  },
  tmp: 0,
};

export const orderLineSlice = createSlice({
  name: 'orderLineSlice',
  initialState: initialState,
  reducers: {
    createNewOrderLine: (state, action: PayloadAction<Choose>) => {
      let newOrderLine: OrderLine = {
        productId: action.payload.productId,
        quantity: 1,
        includedTopping: [],
        size: action.payload.size[0].size,
        subTotal: action.payload.basePrice,
      };
      state.line = newOrderLine;
      state.tmp = action.payload.basePrice;
    },
    incrementQuantity: state => {
      state.line.quantity++;
      state.line.subTotal = state.line.quantity * state.tmp;
    },
    decrementQuantity: state => {
      state.line.quantity--;
      state.line.subTotal = state.line.quantity * state.tmp;
    },
    deleteTopping: (state, action: PayloadAction<Topping>) => {
      const index = state.line.includedTopping.findIndex(
        topping => topping.toppingId === action.payload.toppingId,
      );
      if (index !== -1) {
        state.line.includedTopping.splice(index, 1);
        state.tmp -= action.payload.price;
        state.line.subTotal = state.line.quantity * state.tmp;
      }
    },
    addNewTopping: (state, action: PayloadAction<Topping>) => {
      state.line.includedTopping.push({
        toppingId: action.payload.toppingId,
      });
      state.tmp += action.payload.price;
      state.line.subTotal = state.line.quantity * state.tmp;
    },
  },
});

export const {
  createNewOrderLine,
  incrementQuantity,
  decrementQuantity,
  deleteTopping,
  addNewTopping,
} = orderLineSlice.actions;

export default orderLineSlice.reducer;
