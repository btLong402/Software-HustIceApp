import axios from 'axios';
import axiosClient from './api';
import {setAppAccessToken} from './api';
import * as SecureStore from 'expo-secure-store';
export const login = (data: any) => {
  return axiosClient({
    method: 'POST',
    url: '/auth/login',
    data: data,
  })
    .then(async response => {
      if (response.status === 200) {
        if (response.data.accessToken) {
          setAppAccessToken(response.data.accessToken);
        }
        return response.data;
      }
    })
    .catch(error => {
      return error.response.data;
    });
};

export const register = (data: any) => {
  return axios({
    method: 'POST',
    url: '/auth/register',
    data: data,
  })
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch(error => {
      return error.response.data;
    });
};
