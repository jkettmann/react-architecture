import { useQuery } from "@tanstack/react-query";

import FeedService from "@/infrastructure/feed";

export const queryKey = "feed";

export function useGetFeed() {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => FeedService.getFeed(),
  });
}
