import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api-client";

async function logout() {
  await apiClient.post(`/logout`);
}

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
