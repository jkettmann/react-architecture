import { apiClient } from "@/services/api-client";
import { GetUserApi, GetUserParams, GetUserDto } from "./user.interfaces";

export const getUser: GetUserApi = async (params: GetUserParams) => {
  const res = await apiClient<GetUserDto>(`/user/${params.handle}`);
  return res.data;
};
