import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user";

export function useGetUser(handle: string) {
  const query = useQuery({
    queryKey: ["user", handle],
    queryFn: () => getUser({ handle }),
  });
  return query;
}
