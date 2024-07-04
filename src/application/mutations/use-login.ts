import { useMutation, useQueryClient } from "@tanstack/react-query";

import AuthService from "@/infrastructure/auth";

import { getQueryKey as getFeedQueryKey } from "../queries/use-get-feed";
import { getQueryKey as getMeQueryKey } from "../queries/use-get-me";

type Credentials = Parameters<(typeof AuthService)["login"]>[0];

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: Credentials) => AuthService.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getMeQueryKey() });
      queryClient.invalidateQueries({ queryKey: getFeedQueryKey() });
    },
  });
}
