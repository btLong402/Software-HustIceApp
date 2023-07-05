/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface Category {
  categoryId: string;
  title: string;
}

export interface CategoryList {
  categoryList: Category[] | null;
}

const initialState: CategoryList = {
  categoryList: null,
};

export const categorySlice = createSlice({
  name: 'categorySlice',
  initialState: initialState,
  reducers: {
    addNewCategory: (state, action: PayloadAction<Category>) => {
      if (state.categoryList === null) {
        state.categoryList = [];
      }
      state.categoryList.push(action.payload);
    },
  },
});

export const {addNewCategory} = categorySlice.actions;

export default categorySlice.reducer;
