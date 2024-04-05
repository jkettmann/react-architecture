import { Me, User, UserShoutsResponse } from "@/types";

import { apiClient } from "./client";

async function getMe() {
  const response = await apiClient.get<{ data: Me }>("/me");
  const me = response.data.data;
  return me;
}

async function getUser(handle: string) {
  const response = await apiClient.get<{ data: User }>(`/user/${handle}`);
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
