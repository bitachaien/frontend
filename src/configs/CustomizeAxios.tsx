/**
 * CustomizeAxios - 3 Axios instances như BC88BET
 * 1. authInstance - Cho login/register
 * 2. contentInstance - Cho API chính (cần auth)
 * 3. contentCFInstance - Cho API không cần auth
 */

import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import { getToken, removeToken } from "./client-store";
import { message as Message } from "antd";
import { openNotification } from "@/utils/check";

// Base URLs
const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL || "https://www.78968.site";
const CONTENT_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.78968.site";

/**
 * =========================
 * Auth API
 * =========================
 */
const authInstance: AxiosInstance = axios.create({
  baseURL: AUTH_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

authInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

authInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    console.log("Auth API Error:", error.response);

    if (error.response && error.response.data) {
      const errorData = error.response.data as any;
      if (errorData?.msg) {
        Message.error(errorData.msg);
      }
      return Promise.reject(errorData);
    }

    return Promise.reject(error.message || "Request failed");
  }
);

/**
 * =========================
 * Content API (cần auth)
 * =========================
 */
const contentInstance: AxiosInstance = axios.create({
  baseURL: CONTENT_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

contentInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

contentInstance.interceptors.response.use(
  (response) => {
    const data = response.data;

    if (data?.status === false && data?.msg) {
      openNotification({
        type: "error",
        message: data.msg,
      });
    }

    return data;
  },
  (error: AxiosError) => {
    const status = error.response?.status;

    if (
      process.env.NODE_ENV === "development" &&
      status !== 401 &&
      status !== 404
    ) {
      console.log("Content API Error:", error.response);
    }

    if (status === 401) {
      removeToken();
      if (typeof window !== "undefined") {
        window.location.href = "/logout";
      }
    }

    if (error.response && error.response.data) {
      const errorData = error.response.data as any;

      if (errorData?.msg && status !== 401 && status !== 404) {
        openNotification({
          type: "error",
          message: errorData.msg,
        });
      }

      return Promise.reject(errorData);
    }

    return Promise.reject(error.message || "Request failed");
  }
);

/**
 * =========================
 * Content CF / Public API
 * =========================
 */
const contentCFInstance: AxiosInstance = axios.create({
  baseURL: CONTENT_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

contentCFInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    console.log("Content CF API Error:", error.response);

    if (error.response && error.response.data) {
      const errorData = error.response.data as any;
      if (errorData?.msg) {
        Message.error(errorData.msg);
      }
      return Promise.reject(errorData);
    }

    return Promise.reject(error.message || "Request failed");
  }
);

export { authInstance, contentInstance, contentCFInstance };
