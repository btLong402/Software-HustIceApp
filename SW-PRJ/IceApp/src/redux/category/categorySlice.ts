/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface Category {
  categoryId: string;
  title: string;
}

export interface CategoryList {
  categoryList: Category[];
}

const initialState: CategoryList = {
  categoryList: [],
};

export const categorySlice = createSlice({
  name: 'categorySlice',
  initialState: initialState,
  reducers: {
    addNewCategory: (state, action: PayloadAction<Category>) => {
      state.categoryList.push(action.payload);
    },
  },
});

export const {addNewCategory} = categorySlice.actions;

export default categorySlice.reducer;
