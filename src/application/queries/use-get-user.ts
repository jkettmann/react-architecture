import { useQuery } from "@tanstack/react-query";

import UserService from "@/infrastructure/user";

interface GetUserInput {
  handle?: string;
}

export function getQueryKey(handle?: string) {
  return ["user", handle];
}

export function useGetUser({ handle }: GetUserInput) {
  return useQuery({
    queryKey: getQueryKey(handle),
    queryFn: () => UserService.getUser(handle),
  });
}
