import { useQuery } from "@tanstack/react-query";

import UserService from "@/infrastructure/user";

interface GetUserShoutsInput {
  handle?: string;
}

export const queryKey = "user-shouts";

export function useGetUserShouts({ handle }: GetUserShoutsInput) {
  return useQuery({
    queryKey: [queryKey, handle],
    queryFn: () => UserService.getUserShouts(handle),
  });
}
