import { useQuery } from "@tanstack/react-query";

import UserService from "@/infrastructure/user";

export function getQueryKey() {
  return ["me"];
}

export function useGetMe() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => UserService.getMe(),
  });
}
