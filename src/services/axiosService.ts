import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => ({
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  }),
  (error) => {
    alert(error.message);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    console.groupCollapsed(
      `[${res.status} ${res.config.method}] ${res.config.url}`,
    );
    console.log(">>> data", res.data);
    console.groupEnd();

    return res;
  },
  (error) => {
    console.log(`[ Error ] ${error.message}`, error.config);
    return Promise.reject(error.response.data);
  },
);

export type APIResponse<T> = {
  code: string;
  message: string;
  result: T;
  error?: string;
};

export const _axios = async <T>(
  props: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  const {
    data: { code, message, result },
  } = await instance(props);
  return { code, message, result };
};
