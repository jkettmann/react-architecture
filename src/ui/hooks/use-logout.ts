import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/services/auth";

export function useLogout() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
  return mutation;
}
