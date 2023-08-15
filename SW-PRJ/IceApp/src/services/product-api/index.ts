/* eslint-disable prettier/prettier */
import { AxiosError } from 'axios';
import {client} from '../client';
export const getAllProducts = async () => {
  try {
    const response = await client.get('/products');
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getAllTopping = async () => {
  try {
    const response = await client.get('/variation/topping/');
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getAllSize = async () => {
  try {
    const response = await client.get('/variation/size/');
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getAllCategory = async () => {
  try {
    const response = await client.get('/variation/category');
    return response;
  } catch (error) {
    console.error(error);
  }
};
