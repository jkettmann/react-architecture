import { apiClient } from "../client";
import { dtoToImage } from "../media/transform";
import { dtoToShout } from "../shout/transform";

import { MeDto, UserDto, UserShoutsResponse } from "./dto";
import { dtoToMe, dtoToUser } from "./transform";

async function getMe() {
  const response = await apiClient.get<{ data: MeDto }>("/me");
  const meDto = response.data.data;
  return dtoToMe(meDto);
}

async function getUser(handle: string) {
  const response = await apiClient.get<{ data: UserDto }>(`/user/${handle}`);
  const userDto = response.data.data;
  return dtoToUser(userDto);
}

async function getUserShouts(handle: string) {
  const response = await apiClient.get<UserShoutsResponse>(
    `/user/${handle}/shouts`
  );
  const shouts = response.data.data.map(dtoToShout);
  const images = response.data.included.map(dtoToImage);
  return { shouts, images };
}

export default { getMe, getUser, getUserShouts };
