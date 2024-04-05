import { apiClient } from "../client";
import { ImageDto } from "../media/dto";
import { UserDto } from "../user/dto";

import { FeedResponse } from "./dto";

async function getFeed() {
  const response = await apiClient.get<FeedResponse>("/feed");
  const shouts = response.data.data;
  const users = response.data.included.filter(
    (u): u is UserDto => u.type === "user"
  );
  const images = response.data.included.filter(
    (i): i is ImageDto => i.type === "image"
  );
  return { shouts, users, images };
}

export default { getFeed };
