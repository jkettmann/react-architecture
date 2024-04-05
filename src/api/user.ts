import { Me, User, UserShoutsResponse } from "@/types";

import { apiClient } from "./client";

async function getMe() {
  const response = await apiClient.get<{ data: Me }>("/me");
  return response.data;
}

async function getUser(handle: string) {
  const response = await apiClient.get<{ data: User }>(`/user/${handle}`);
  return response.data;
}

async function getUserShouts(handle: string) {
  const response = await apiClient.get<UserShoutsResponse>(
    `/user/${handle}/shouts`
  );
  return response.data;
}

export default { getMe, getUser, getUserShouts };
