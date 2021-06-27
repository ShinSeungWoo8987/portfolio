import axios from 'axios';

let accessToken: null | string = null;

export const setAccessToken = (s?: string) => {
  if (s) accessToken = s;
  else accessToken = null;
};

export const getAccessToken = () => {
  return accessToken;
};

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers['authorization'] = 'barer ' + token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};
