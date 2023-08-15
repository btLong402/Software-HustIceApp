import axios from 'axios';
import axiosClient, {config} from './api';
import {setAppAccessToken} from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_STATUS} from '../utils/constants';

const login = (data: any) => {
  return axiosClient({
    method: 'POST',
    url: '/users/login',
    data: data,
  })
    .then(async response => {
      console.log('response: ', response);
      if (response.status === API_STATUS.SUCCESS) {
        if (response.headers['token']) {
          setAppAccessToken(response.data.token);
          await AsyncStorage.setItem('token', response.data.token);
          await AsyncStorage.setItem('_id', response.data._id);
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
      url: '/users/register',
      data: data,
    })
    .then(response => {
      // console.log('response: ', response.status);
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
  await AsyncStorage.removeItem('_id');
  await AsyncStorage.removeItem('user_info');
};

export default {
  login,
  register,
  logout,
};
