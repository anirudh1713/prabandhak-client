import axios from 'axios';
import {config} from '../config';

export const request = axios.create({
  baseURL: config.apiEndpoint,
  withCredentials: true,
});

const createResponseInterceptor = () => {
  const interceptor = request.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      /**
       * Eject this interceptor to make sure we don't send repetitive request
       * if refresh token is also invalid/expired (which will result in 401 as well).
       */
      request.interceptors.response.eject(interceptor);

      return request
        .get('/auth/refresh')
        .then(() => {
          return Promise.resolve();
        })
        .catch(err => {
          // window.location.pathname = '/login';
          return Promise.reject(err);
        })
        .finally(createResponseInterceptor);
    },
  );
};

createResponseInterceptor();
