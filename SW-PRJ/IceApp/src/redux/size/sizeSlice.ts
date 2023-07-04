/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface Size {
  sizeId: string;
  size: string;
  price: number;
}

export interface SizeList {
    sizeList: Size[];
}

const initialState: SizeList = {
    sizeList: [],
};

export const sizeSlice = createSlice({
  name: 'sizeSlice',
  initialState: initialState,
  reducers: {
    addNewSize: (state, action: PayloadAction<Size>) => {
      state.sizeList.push(action.payload);
    },
  },
});

export const {
    addNewSize,
} = sizeSlice.actions;

export default sizeSlice.reducer;
