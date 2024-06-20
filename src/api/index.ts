/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable no-throw-literal */
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import _axios from 'axios';
import axiosRetry from 'axios-retry';
import { getAuthToken, removeAuthToken } from './cookies';

const API_BASE_URL = 'https://library-project-8kmz.onrender.com/api/v1';

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
const retryDelay = (retryNumber = 0) => {
  const seconds = 2 ** retryNumber * 1000;
  const randomMs = 1000 * Math.random();
  return seconds + randomMs;
};

const retryConfig = {
  retries: 2,
  retryDelay,
  retryCondition: axiosRetry.isRetryableError,
};

const handleApiSuccess = (res: AxiosResponse) => {
  return res;
};

const handleApiError = (err: AxiosError) => {
  if (err.response) {
    const { status, data } = err.response;

    if (status === 401) {
      // Remove auth token cookie
      removeAuthToken();

      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    // Handle error response from the server
    const error =
      (data as any).error || (data as any).message || (data as any).detail || 'An error occurred';

    throw error;
  } else if (err.request) {
    // Handle network error (no response received)
    throw 'Network Error';
  } else {
    // Handle unexpected error
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
