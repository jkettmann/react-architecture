import { useQuery } from "@tanstack/react-query";
import { getFeed } from "@/services/feed";

export function useGetFeed() {
  const query = useQuery({
    queryKey: ["feed"],
    queryFn: () => getFeed(),
  });
  return query;
}
