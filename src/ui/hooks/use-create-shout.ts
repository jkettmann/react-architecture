import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/ui/api-client";
import { Shout } from "@/ui/types";

interface ShoutInput {
  message: string;
  imageId?: string;
}

async function createShout(input: ShoutInput) {
  const res = await apiClient.post<{ data: Shout }>(`/shout`, input);
  return res.data;
}

export function useCreateShout() {
  const queryClient = useQueryClient();

  const mutation = useMutation<{ data: Shout }, unknown, ShoutInput>({
    mutationFn: (input) => createShout(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
  return mutation;
}
