import { apiClient } from "../client";

import { MeDto, UserDto, UserShoutsResponse } from "./dto";

async function getMe() {
  const response = await apiClient.get<{ data: MeDto }>("/me");
  const me = response.data.data;
  return me;
}

async function getUser(handle: string) {
  const response = await apiClient.get<{ data: UserDto }>(`/user/${handle}`);
  const user = response.data.data;
  return user;
}

async function getUserShouts(handle: string) {
  const response = await apiClient.get<UserShoutsResponse>(
    `/user/${handle}/shouts`
  );
  const shouts = response.data.data;
  const images = response.data.included;
  return { shouts, images };
}

export default { getMe, getUser, getUserShouts };
