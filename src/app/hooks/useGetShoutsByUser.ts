import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api-client";
import { Image, Shout } from "@/types";

async function getShoutsByUser(handle: string) {
  const res = await apiClient<{
    data: Shout[];
    included: Image[];
  }>(`/user/${handle}/shouts`);
  return res.data;
}

export function useGetShoutsByUser(handle: string) {
  const query = useQuery({
    queryKey: ["shouts", handle],
    queryFn: () => getShoutsByUser(handle),
  });
  return query;
}
