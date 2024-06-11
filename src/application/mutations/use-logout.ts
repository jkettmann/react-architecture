import { useMutation, useQueryClient } from "@tanstack/react-query";

import AuthService from "@/infrastructure/auth";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
}
