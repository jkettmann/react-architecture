import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api-client";
import { User } from "@/types";

async function getUser(handle: string) {
  const res = await apiClient<{
    data: User;
  }>(`/user/${handle}`);
  return res.data;
}

export function useGetUser(handle: string) {
  const query = useQuery({
    queryKey: ["user", handle],
    queryFn: () => getUser(handle),
  });
  return query;
}
