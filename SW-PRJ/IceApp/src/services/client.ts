/* eslint-disable prettier/prettier */
import axios, {AxiosResponse} from 'axios';

const responseBody = (res: AxiosResponse<any, any>) => res.data;

export const createClient = (api_root: string, apiConfig = {}) => {
  return {
    get: (url: string, config: any = {}) =>
      axios
        .get(`${api_root}${url}`, {...config, ...apiConfig})
        .then(responseBody),
    post: (url: string, config: any) =>
      axios
        .post(`${api_root}${url}`, {...config, ...apiConfig})
        .then(responseBody),
    del: (url: string, config: any) =>
      axios
        .delete(`${api_root}${url}`, {...config, ...apiConfig})
        .then(responseBody),
    put: (url: string, config: any) =>
      axios
        .put(`${api_root}${url}`, {...config, ...apiConfig})
        .then(responseBody),
  };
};

export const client = createClient('http://192.168.50.72:4000/api');
