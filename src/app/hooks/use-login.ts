import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api-client";

interface Credentials {
  username: string;
  password: string;
}

async function login(credentials: Credentials) {
  await apiClient.post(`/login`, credentials);
}

export function useLogin() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, unknown, Credentials>({
    mutationFn: (credentials) => login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
  return mutation;
}
