/* eslint-disable prettier/prettier */
import axios, {AxiosResponse} from 'axios';
import {Platform} from 'react-native';
import Config from 'react-native-config';

const responseBody = (res: AxiosResponse<any, any>) => res.data;
let config;
Platform.OS === 'ios'
? (config = Config.API_URL_IOS)
: (config = Config.API_URL_AND);
console.log("🚀 ~ file: client.ts:9 ~ Platform.OS:", Platform.OS)
console.log("🚀 ~ file: client.ts:10 ~ Config.API_URL_IOS:", Config.API_URL_IOS)
console.log("🚀 ~ file: client.ts:11 ~ Config.API_URL_AND:", Config.API_URL_AND)
console.log("🚀 ~ file: client.ts:8 ~ config:", config)

export const createClient = (api_root: string | undefined, apiConfig = {}) => {
  return {
    get: (url: string, config: any = {}) =>
      axios
        .get(`${api_root}${url}`, {...config, ...apiConfig})
        .then(responseBody)
        .catch(err => {
          throw err;
        }),
    post: (url: string, config: any) =>
      axios
        .post(`${api_root}${url}`, {...config, ...apiConfig})
        .then(responseBody)
        .catch(err => {
          throw err;
        }),
    del: (url: string, config: any) =>
      axios
        .delete(`${api_root}${url}`, {...config, ...apiConfig})
        .then(responseBody)
        .catch(err => {
          throw err;
        }),
    put: (url: string, config: any) =>
      axios
        .put(`${api_root}${url}`, {...config, ...apiConfig})
        .then(responseBody)
        .catch(err => {
          throw err;
        }),
  };
};

export const client = createClient(`${config}`);
