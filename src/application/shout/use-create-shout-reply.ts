import { CreateReplyParams, createReply } from "@/services/shout";
import { useMutation } from "@tanstack/react-query";

export function useCreateShoutReply() {
  const mutation = useMutation<void, unknown, CreateReplyParams>({
    mutationFn: (input) => createReply(input),
  });
  return mutation;
}
