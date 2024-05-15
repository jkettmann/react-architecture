import { apiClient } from "../client";

import { MeDto, UserDto, UserShoutsResponse } from "./dto";

async function getMe() {
  const response = await apiClient.get<{ data: MeDto }>("/me");
  return response.data;
}

async function getUser(handle: string) {
  const response = await apiClient.get<{ data: UserDto }>(`/user/${handle}`);
  return response.data;
}

async function getUserShouts(handle: string) {
  const response = await apiClient.get<UserShoutsResponse>(
    `/user/${handle}/shouts`
  );
  return response.data;
}

export default { getMe, getUser, getUserShouts };
