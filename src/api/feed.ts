import { FeedResponse, Image, User } from "@/types";

import { apiClient } from "./client";

async function getFeed() {
  const response = await apiClient.get<FeedResponse>("/feed");
  const shouts = response.data.data;
  const users = response.data.included.filter(
    (u): u is User => u.type === "user"
  );
  const images = response.data.included.filter(
    (i): i is Image => i.type === "image"
  );
  return { shouts, users, images };
}

export default { getFeed };
