import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoutId } from "@/domain/shout";
import { CreateShoutParams, createShout } from "@/services/shout";

export function useCreateShout() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ShoutId, unknown, CreateShoutParams>({
    mutationFn: (input) => createShout(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
  return mutation;
}
