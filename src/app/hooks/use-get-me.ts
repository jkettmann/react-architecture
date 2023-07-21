import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api-client";
import { Me } from "@/types";

const ONE_HOUR = 1000 * 60 * 60;

async function getMe() {
  const res = await apiClient<{ data: Me }>(`/me`);
  return res.data;
}

export function useGetMe() {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
    staleTime: ONE_HOUR,
  });
  return query;
}
