/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface Product {
  productId: string;
  name: string;
  description: string;
  basePrice: number;
  discount: number;
  category: Array<{
    title: string;
  }>;
  sizeList: Array<{
    sizeId: string;
  }>;
  toppingList: Array<{
    toppingId: string;
  }>;
  image: string;
}

export interface ProductList {
  productList: Product[];
}

const initialState: ProductList = {
  productList: [],
};

export const productSlice = createSlice({
  name: 'productSlice',
  initialState: initialState,
  reducers: {
    addNewProduct: (state, action: PayloadAction<Product>) => {
      state.productList.push(action.payload);
    },
  },
});

export const {addNewProduct} = productSlice.actions;

export default productSlice.reducer;
