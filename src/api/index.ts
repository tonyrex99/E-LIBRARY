/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable no-throw-literal */
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import _axios from 'axios';

import axiosRetry from 'axios-retry';
import { getAuthToken } from './cookies';

const API_BASE_URL = 'https://library-project-8kmz.onrender.com/api/v1'; // '/api'; // 'https://library-project-4iu4.onrender.com/api/v1'; //'/api';

const axiosInstance = _axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
});

/* Add auth header interceptor */
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getAuthToken();

    if (typeof token === 'string' && token.trim() !== '' && token != 'false') {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = '*/*';
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Retry configuration
// would be lovely to have some retry setup here
const retryDelay = (retryNumber = 0) => {
  const seconds = 2 ** retryNumber * 1000;
  const randomMs = 1000 * Math.random();
  return seconds + randomMs;
};

const retryConfig = {
  retries: 2,
  retryDelay,
  // retry on Network Error & 5xx responses
  retryCondition: axiosRetry.isRetryableError,
};

const handleApiSuccess = (res: AxiosResponse) => {
  return res;
};

const handleApiError = (err: AxiosError) => {
  if (err.response) {
    // Handle error response from the server

    const { data } = err.response;
    const error =
      (data as any).error || (data as any).message || (data as any).detail || 'An error occurred';

    throw error;
  } else if (err.request) {
    // Handle network error (no response received)
    // console.error('A network error occurred. Please check your internet connection.');
    throw 'Network Error';
  } else {
    // Handle unexpected error
    // console.error('An unexpected error occurred:', err.message);
    throw 'Unexpected Error';
  }
};

const Api = {
  getCancelTokenSource: () => _axios.CancelToken.source(),
  get: <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance
      .get(endpoint, { 'axios-retry': retryConfig, ...config })
      .then(handleApiSuccess)
      .catch(handleApiError) as Promise<T>,
  post: <T>(endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance
      .post(endpoint, data, config)
      .then(handleApiSuccess)
      .catch(handleApiError) as Promise<T>,
  put: <T>(endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance
      .put(endpoint, JSON.stringify(data), config)
      .then(handleApiSuccess)
      .catch(handleApiError) as Promise<T>,
  patch: <T>(endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance
      .patch(endpoint, data, config)
      .then(handleApiSuccess)
      .catch(handleApiError) as Promise<T>,
  delete: <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance
      .delete(endpoint, config)
      .then(handleApiSuccess)
      .catch(handleApiError) as Promise<T>,
};

export default Api;
