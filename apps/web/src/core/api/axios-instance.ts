import axios, { type AxiosError } from "axios";
import { ApiError, formatErrorMessage } from "./api-error";

declare module "axios" {
  export interface AxiosRequestConfig {
    showToast?: boolean;
    operation?: string;
  }
}

type ApiErrorPayload = {
  title?: string;
  message?: string;
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => config,
  (error: AxiosError) =>
    Promise.reject(
      new ApiError({
        message: error.message || "Erro ao realizar requisição",
        originalError: error,
      }),
    ),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response, config } = error;
    const responseData = response?.data as ApiErrorPayload | undefined;
    const status = response?.status;
    const operation = config?.operation;

    return Promise.reject(
      new ApiError({
        title: responseData?.title,
        message:
          responseData?.message ??
          (status
            ? formatErrorMessage(status, operation)
            : error.message || "Erro de rede"),
        status,
        data: response?.data,
        operation,
        originalError: error,
      }),
    );
  },
);
