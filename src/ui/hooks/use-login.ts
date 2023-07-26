import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginParams, login } from "@/services/auth";

export function useLogin() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, unknown, LoginParams>({
    mutationFn: (credentials) => login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
  return mutation;
}
