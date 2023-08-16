import clientApi from './api';
import {API_STATUS} from '../utils/constants';
import axiosClient from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getProfile = async id => {
  return axiosClient({
    method: 'GET',
    url: `/users/${id}`,
  })
    .then(async response => {
      if (response.status === API_STATUS.SUCCESS) {
        const resData = JSON.parse(JSON.stringify(response.data.data));
        // delete resData._id;
        resData.dob = resData.dob ? new Date(resData.dob) : null;
        resData.avatar = {
          uri: resData.avatarPath,
        };
        delete resData.avatarPath;
        await AsyncStorage.setItem('user_info', JSON.stringify(resData));
        return {
          status: 'OK',
          data: resData,
        };
      }
    })
    .catch(error => {
      console.log('error', error.response);
      return {
        status: 'ERROR',
        data: error.response.data,
      };
    });

  // return response.data;
};

const updateProfile = async (id, data) => {
  // console.log('udpateProfile: ', data);
  let formData = new FormData();
  for (let key in data) {
    console.log(`data[${key}]: `, data[key]);
    if (key === 'dob') {
      formData.append(key, new Date(data[key]).toISOString());
    } else formData.append(key, data[key]);
  }

  return axiosClient({
    method: 'PUT',
    url: `/users/${id}`,
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(async response => {
      // console.log('response: ', response.status);
      if (response.status === API_STATUS.SUCCESS) {
        const resData = JSON.parse(JSON.stringify(response.data.data));
        delete resData._id;
        resData.dob = new Date(resData.dob);
        resData.avatar = {
          uri: resData.avatarPath,
        };
        delete resData.avatarPath;
        console.log('resData: ', resData);
        await AsyncStorage.setItem('user_info', JSON.stringify(resData));
        return {
          status: 'OK',
          data: resData,
        };
      }
    })
    .catch(error => {
      console.log('error', error.response);
      //   return {
      //     status: 'ERROR',
      //     data: error.response.data,
      //   };
    });

  // return response.data;
};
export default {
  getProfile,
  updateProfile,
};
