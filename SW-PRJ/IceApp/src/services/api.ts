import axios, {AxiosResponse} from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {TOKEN} from '../utils/constants';
import {API_STATUS} from '../utils/constants';

export const config = {
  baseURL: Config.API_URL,
  validateStatus: status => status >= 200 && status < 400,
  timeout: 60000,
};

// let isRefreshing = false;
// let failedQueue = [];

// // EX: Push callback to failedQueue for retry request
// function addFailedQueue(cb) {
//   failedQueue.push(cb);
// }

// function processFailedQueue(token) {
//   failedQueue.forEach(cb => cb(token));
//   failedQueue = [];
// }

async function reloadApp() {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('_id');
  // isRefreshing = false;
  // failedQueue = [];
  // force reload app, reset all state
  // window.location.replace(`${LOCATION.SIGN_IN}?redirect=${window.history.state.as}`);
}

const axiosClient = axios.create(config);

export function setAppAccessToken(token) {
  axiosClient.defaults.headers.common['TOKEN'] = token
  ;
}

axiosClient.interceptors.response.use(
  response => response,
  async error => {
    const {config: originalRequest, response} = error;

    if (response.status === API_STATUS.UNAUTHORIZED) {
      await reloadApp();
    } else {
      return Promise.reject(error);
    }
  },
);
// const refreshAccessToken = refreshToken => {
//   return axios({
//     method: 'POST',
//     url: '/auth/refresh-token',
//     data: {refreshToken},
//   });
// };

// axiosClient.interceptors.response.use(
//   response => response,
//   async error => {
//     const {config: originalRequest, response} = error;

//     // EX: Handle 401 error
//     if (response?.status === API_STATUS.UNAUTHORIZED) {
//       const reToken = await AsyncStorage.getItem(TOKEN.REFRESHTOKEN);

//       // EX: Check if token is expired
//       if (!reToken) {
//         reloadApp();
//         return Promise.reject(error);
//       }

//       // EX: Check if token is refreshing
//       if (!isRefreshing) {
//         isRefreshing = true;

//         try {
//           const refreshResponse = await refreshAccessToken(reToken);

//           const {newAccessToken, newRefreshToken} = refreshResponse.data;

//           await SecureStore.setItemAsync(TOKEN.ACCESSTOKEN, newAccessToken);
//           await SecureStore.setItemAsync(TOKEN.REFRESHTOKEN, newRefreshToken);

//           isRefreshing = false;

//           setAppAccessToken(newAccessToken);

//           // EX: Add callback to failedQueue for retry request and process it
//           return new Promise(resolve => {
//             addFailedQueue(newToken => {
//               originalRequest.headers.Authorization = createAuthToken(newToken);

//               resolve(axiosClient(originalRequest));
//             });

//             processFailedQueue(newAccessToken);
//           });
//         } catch (_e) {
//           reloadApp();
//           return Promise.reject(error);
//         }
//       }

//       // EX: ONLY add callback to failedQueue for retry request
//       return new Promise(resolve => {
//         addFailedQueue(newToken => {
//           originalRequest.headers.Authorization = createAuthToken(newToken);

//           resolve(axiosClient(originalRequest));
//         });
//       });
//     }

//     // EX: Handle other error
//     return Promise.reject(error);
//   },
// );

export default axiosClient;
