import axios, {AxiosResponse} from 'axios';
import Config from 'react-native-config';
import * as SecureStore from 'expo-secure-store';

enum TOKEN {
  ACCESSTOKEN = 'accessToken',
  REFRESHTOKEN = 'refreshToken',
}

const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  UNAUTHORIZED: 401,
};

const config = {
  baseURL: Config.API_URL,
  validateStatus: status => status >= 200 && status < 400,
  timeout: 60000,
};

let isRefreshing = false;
let failedQueue = [];

// EX: Push callback to failedQueue for retry request
function addFailedQueue(cb) {
  failedQueue.push(cb);
}

function processFailedQueue(token) {
  failedQueue.forEach(cb => cb(token));
  failedQueue = [];
}

async function reloadApp() {
  await SecureStore.deleteItemAsync(TOKEN.ACCESSTOKEN);
  await SecureStore.deleteItemAsync(TOKEN.REFRESHTOKEN);
  isRefreshing = false;
  failedQueue = [];
  // force reload app, reset all state
  // window.location.replace(`${LOCATION.SIGN_IN}?redirect=${window.history.state.as}`);
}

const axiosClient = axios.create(config);

const createAuthToken = token => `Bearer ${token}`;

export function setAppAccessToken(token) {
  axiosClient.defaults.headers.Authorization = createAuthToken(token);
}

const refreshAccessToken = refreshToken => {
  return axios({
    method: 'POST',
    url: '/auth/refresh-token',
    data: {refreshToken},
  });
};

axiosClient.interceptors.response.use(
  response => response,
  async error => {
    const {config: originalRequest, response} = error;

    // EX: Handle 401 error
    if (response?.status === API_STATUS.UNAUTHORIZED) {
      const reToken = await SecureStore.getItemAsync(TOKEN.REFRESHTOKEN);

      // EX: Check if token is expired
      if (!reToken) {
        reloadApp();
        return Promise.reject(error);
      }

      // EX: Check if token is refreshing
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshResponse = await refreshAccessToken(reToken);

          const {newAccessToken, newRefreshToken} = refreshResponse.data;

          await SecureStore.setItemAsync(TOKEN.ACCESSTOKEN, newAccessToken);
          await SecureStore.setItemAsync(TOKEN.REFRESHTOKEN, newRefreshToken);

          isRefreshing = false;

          setAppAccessToken(newAccessToken);

          // EX: Add callback to failedQueue for retry request and process it
          return new Promise(resolve => {
            addFailedQueue(newToken => {
              originalRequest.headers.Authorization = createAuthToken(newToken);

              resolve(axiosClient(originalRequest));
            });

            processFailedQueue(newAccessToken);
          });
        } catch (_e) {
          reloadApp();
          return Promise.reject(error);
        }
      }

      // EX: ONLY add callback to failedQueue for retry request
      return new Promise(resolve => {
        addFailedQueue(newToken => {
          originalRequest.headers.Authorization = createAuthToken(newToken);

          resolve(axiosClient(originalRequest));
        });
      });
    }

    // EX: Handle other error
    return Promise.reject(error);
  },
);

export default axiosClient;
