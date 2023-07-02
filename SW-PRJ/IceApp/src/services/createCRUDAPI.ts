import {Axios, AxiosResponse} from 'axios';

export const createClient = (
  clientApi: Axios,
  api_root: string,
  apiConfig = {},
) => {
  return {
    get: (url: string, config: any = {}) =>
      clientApi
        .get(`${api_root}${url}`, {...config, ...apiConfig})
        .then(responseBody),
    post: (url: string, config: any) =>
      clientApi
        .post(`${api_root}${url}`, {...config, ...apiConfig})
        .then(responseBody),
    del: (url: string, config: any) =>
      clientApi
        .delete(`${api_root}${url}`, {...config, ...apiConfig})
        .then(responseBody),
    put: (url: string, config: any) =>
      clientApi
        .put(`${api_root}${url}`, {...config, ...apiConfig})
        .then(responseBody),
  };
};
const responseBody = (res: AxiosResponse<any, any>) => res.data;

// export const nextClient = createClient('');

// export const testClient = createClient('http://localhost:3001/api');

// export const client = createClient('http://localhost:3001/api');
