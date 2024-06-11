import { useMutation, useQueryClient } from "@tanstack/react-query";

import AuthService from "@/infrastructure/auth";

type Credentials = Parameters<(typeof AuthService)["login"]>[0];

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: Credentials) => AuthService.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
}
