import { getMe } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

const ONE_HOUR = 1000 * 60 * 60;

export function useGetMe() {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
    staleTime: ONE_HOUR,
  });
  return query;
}
