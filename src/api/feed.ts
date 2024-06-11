import { FeedResponse } from "@/types";

import { apiClient } from "./client";

async function getFeed() {
  const response = await apiClient.get<FeedResponse>("/feed");
  return response.data;
}

export default { getFeed };
