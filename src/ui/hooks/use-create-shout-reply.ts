import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/services/api-client";

interface ReplyInput {
  shoutId: string;
  replyId: string;
}

async function createShoutReply({ shoutId, replyId }: ReplyInput) {
  await apiClient.post(`/shout/${shoutId}/reply`, { replyId });
}

export function useCreateShoutReply() {
  const mutation = useMutation<void, unknown, ReplyInput>({
    mutationFn: (input) => createShoutReply(input),
  });
  return mutation;
}
