import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { storageService } from "./storageService";
import { tokenReissue } from "./api";
export function getJWTHeader(): Record<string, string> {
  const tokens = storageService.getStoredToken();
  return { Authorization: tokens?.accessToken ?? "" };
}

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
    if (process.env.NODE_ENV !== "production") {
      console.log(res);
    }
    return res;
  },
  async (error) => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }

    if (error.response.data.code === "0217") {
      storageService.clearStoredToken();
      storageService.clearStoredUser();
      window.location.reload();
    } else if (error.response.status === 401) {
      const { result } = await tokenReissue(
        storageService.getStoredToken()?.refreshToken!,
      );
      storageService.setStoredToken(result);
      error.config.headers = { ...error.config.headers, ...getJWTHeader() };
      return instance(error.config);
    }

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
