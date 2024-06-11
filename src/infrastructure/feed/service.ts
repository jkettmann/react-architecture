import { ImageDto } from "../media/dto";
import { dtoToImage } from "../media/transform";
import { dtoToShout } from "../shout/transform";
import { UserDto } from "../user/dto";
import { dtoToUser } from "../user/transform";

import FeedApi from "./api";

async function getFeed(api = FeedApi) {
  const response = await api.getFeed();
  const shouts = response.data.map(dtoToShout);
  const users = response.included
    .filter((u): u is UserDto => u.type === "user")
    .map(dtoToUser);
  const images = response.included
    .filter((i): i is ImageDto => i.type === "image")
    .map(dtoToImage);
  return { shouts, users, images };
}

export default { getFeed };
