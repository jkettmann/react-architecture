import { useQuery } from "@tanstack/react-query";

import UserService from "@/infrastructure/user";

interface GetUserInput {
  handle?: string;
}

export const queryKey = "user";

export function useGetUser({ handle }: GetUserInput) {
  return useQuery({
    queryKey: [queryKey, handle],
    queryFn: () => UserService.getUser(handle),
  });
}
