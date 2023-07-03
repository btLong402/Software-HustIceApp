import axios from 'axios';
import axiosClient, {config} from './api';
import {setAppAccessToken} from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_STATUS} from '../utils/constants';

const login = (data: any) => {
  console.log('test: ', axiosClient);
  return axiosClient({
    method: 'POST',
    url: '/user/login',
    data: data,
  })
    .then(async response => {
      console.log('response: ', response.status);
      if (response.status === API_STATUS.SUCCESS) {
        console.log('response: ', response.headers);
        if (response.headers['token']) {
          setAppAccessToken(response.data.token);
          await AsyncStorage.setItem('token', response.data.token);
          await AsyncStorage.setItem('username', response.data.username);
          return {
            status: 'OK',
            data: response.data,
          };
        } else {
          return {
            status: 'ERROR',
            data: 'Token not found',
          };
        }
      }
    })
    .catch(error => {
      return {
        status: 'ERROR',
        data: error.response.data,
      };
    });
};

const register = (data: any) => {
  // console.log('data: ', data);
  return axios
    .create(config)({
      method: 'POST',
      url: '/user/register',
      data: data,
    })
    .then(response => {
      console.log('response: ', response.status);
      if (response.status === API_STATUS.SUCCESS) {
        return {
          status: 'OK',
        };
      }
    })
    .catch(error => {
      console.log('error', error.response.data);
      return {
        status: 'ERROR',
        data: error.response.data,
      };
    });
};

const logout = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('username');
  // await AsyncStorage.removeItem('refreshToken');
};

export default {
  login,
  register,
  logout,
};
