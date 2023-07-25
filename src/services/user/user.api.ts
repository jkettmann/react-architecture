import { apiClient } from "@/services/api-client";
import { UserDto } from "./user.interfaces";

export async function getUser(handle: string) {
  const res = await apiClient<{
    data: UserDto;
  }>(`/user/${handle}`);
  return res.data;
}
