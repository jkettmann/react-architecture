import { apiClient } from "../client";
import { ImageDto } from "../media/dto";
import { dtoToImage } from "../media/transform";
import { dtoToShout } from "../shout/transform";
import { UserDto } from "../user/dto";
import { dtoToUser } from "../user/transform";

import { FeedResponse } from "./dto";

async function getFeed() {
  const response = await apiClient.get<FeedResponse>("/feed");
  const shouts = response.data.data.map(dtoToShout);
  const users = response.data.included
    .filter((u): u is UserDto => u.type === "user")
    .map(dtoToUser);
  const images = response.data.included
    .filter((i): i is ImageDto => i.type === "image")
    .map(dtoToImage);
  return { shouts, users, images };
}

export default { getFeed };
