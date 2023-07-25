import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api-client";
import { Image, Shout, User } from "@/ui/types";

async function getFeed() {
  const res = await apiClient<{
    data: Shout[];
    included: (User | Image)[];
  }>("/feed");
  return res.data;
}

export function useGetFeed() {
  const query = useQuery({
    queryKey: ["feed"],
    queryFn: () => getFeed(),
  });
  return query;
}
