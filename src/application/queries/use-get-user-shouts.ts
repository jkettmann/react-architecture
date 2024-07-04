import { useQuery } from "@tanstack/react-query";

import UserService from "@/infrastructure/user";

interface GetUserShoutsInput {
  handle?: string;
}

export function getQueryKey(handle?: string) {
  return ["user-shouts", handle];
}

export function useGetUserShouts({ handle }: GetUserShoutsInput) {
  return useQuery({
    queryKey: getQueryKey(handle),
    queryFn: () => UserService.getUserShouts(handle),
  });
}
