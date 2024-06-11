import { apiClient } from "../client";

import { FeedResponse } from "./dto";

async function getFeed() {
  const response = await apiClient.get<FeedResponse>("/feed");
  return response.data;
}

export default { getFeed };
