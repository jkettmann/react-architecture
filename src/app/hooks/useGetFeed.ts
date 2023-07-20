import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api-client";
import { FeedResponse } from "@/types";

async function getFeed() {
  const res = await apiClient<FeedResponse>("/feed");
  return res.data;
}

export function useGetFeed() {
  const query = useQuery({
    queryKey: ["feed"],
    queryFn: getFeed,
  });
  return query;
}
