import clientApi from './api';
import {API_STATUS} from '../utils/constants';
import axiosClient from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getProfile = async id => {
  console.log('id: ', id);
  console.log('axiosClient: ', axiosClient.defaults.headers.common['TOKEN']);
  return axiosClient({
    method: 'GET',
    url: `/users/${id}`,
  })
    .then(async response => {
      console.log('response: ', response.data.data);
      if (response.status === API_STATUS.SUCCESS) {
        await AsyncStorage.setItem(
          'user_info',
          JSON.stringify(response.data.data),
        );
        return {
          status: 'OK',
          data: response.data.data,
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
  console.log('data: ', data);
  let formData = new FormData();
  for (let key in data) {
    if (key === 'dob') {
      console.log('data[key]: ', data[key]);
      formData.append(key, new Date(data[key]).toISOString());
    } else formData.append(key, data[key]);
  }
  //   for (const [key, value] of formData.entries()) {
  //     console.log(key + ', ' + value);
  //   }
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
      console.log('response: ', response.status);
      if (response.status === API_STATUS.SUCCESS) {
        const resData = JSON.parse(JSON.stringify(response.data.data));
        delete resData._id;
        resData.dob = new Date(resData.dob);
        resData.avatar = {
          uri: `http://localhost:4001/uploads/${resData.avatarPath}`,
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
