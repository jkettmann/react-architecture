import { apiClient } from "@/services/api-client";
import { GetUserApi } from "./user.interfaces";

export const getUser: GetUserApi = async (params) => {
  const res = await apiClient(`/user/${params.handle}`);
  return res.data;
};
