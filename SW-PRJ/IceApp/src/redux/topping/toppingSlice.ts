/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface Topping {
  toppingId: string;
  name: string;
  price: number;
}

export interface ToppingList {
  toppingList: Topping[];
}

const initialState: ToppingList = {
  toppingList: [],
};

export const toppingSlice = createSlice({
  name: 'toppingSlice',
  initialState: initialState,
  reducers: {
    addNewTopping: (state, action: PayloadAction<Topping>) => {
      state.toppingList.push(action.payload);
    },
  },
});

export const {addNewTopping} = toppingSlice.actions;

export default toppingSlice.reducer;
