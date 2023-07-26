import { apiClient } from "../api-client";
import {
  GetMeApi,
  LoginApi,
  LoginParamsDto,
  LogoutApi,
} from "./auth.interfaces";

export const login: LoginApi = async (params: LoginParamsDto) => {
  await apiClient.post(`/login`, params);
};

export const logout: LogoutApi = async () => {
  await apiClient.post(`/logout`);
};

export const getMe: GetMeApi = async () => {
  const res = await apiClient(`/me`);
  return res.data;
};
