/* eslint-disable prettier/prettier */
import {configureStore} from '@reduxjs/toolkit';
import orderSlice from './order/orderSlice';
import productSlice from './product/productSlice';
import toppingSlice from './topping/toppingSlice';
import sizeSlice from './size/sizeSlice';
import categorySlice from './category/categorySlice';
import orderLineSlice from './order/orderSupportSlice';
import dataSLice  from './Data/dataSlice';
export const store = configureStore({
  reducer: {
    orderCreate: orderSlice,
    productList: productSlice,
    toppingList: toppingSlice,
    sizeList: sizeSlice,
    categoryList: categorySlice,
    orderLine: orderLineSlice,
    data: dataSLice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
