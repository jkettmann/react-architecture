import { apiClient } from "@/services/api-client";
import { GetFeedApi } from "./feed.interfaces";

export const getFeed: GetFeedApi = async () => {
  const res = await apiClient("/feed");
  return res.data;
};
