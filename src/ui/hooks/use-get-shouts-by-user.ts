import { useQuery } from "@tanstack/react-query";
import { getByUser } from "@/services/shout";

export function useGetShoutsByUser(handle: string) {
  const query = useQuery({
    queryKey: ["shouts", handle],
    queryFn: () => getByUser({ handle }),
  });
  return query;
}
