/* eslint-disable prettier/prettier */
import {configureStore} from '@reduxjs/toolkit';
import orderSlice from './order/orderSlice';
import productSlice from './product/productSlice';
import toppingSlice from './topping/toppingSlice';
import sizeSlice from './size/sizeSlice';
import categorySlice from './category/categorySlice';
export const store = configureStore({
  reducer: {
    orderCreate: orderSlice,
    productList: productSlice,
    toppingList: toppingSlice,
    sizeList: sizeSlice,
    categoryList: categorySlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
