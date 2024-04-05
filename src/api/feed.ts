import { apiClient } from "./client";
import { FeedResponse, ImageDto, UserDto } from "./dtos";

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
