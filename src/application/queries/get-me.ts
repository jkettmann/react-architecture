import { useQuery } from "@tanstack/react-query";

import UserService from "@/infrastructure/user";

export const queryKey = "me";

export function useGetMe() {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => UserService.getMe(),
  });
}
