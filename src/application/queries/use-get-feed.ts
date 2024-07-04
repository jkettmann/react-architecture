import { useQuery } from "@tanstack/react-query";

import FeedService from "@/infrastructure/feed";

export function getQueryKey() {
  return ["feed"];
}

export function useGetFeed() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => FeedService.getFeed(),
  });
}
