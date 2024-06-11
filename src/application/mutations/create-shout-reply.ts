import { useMutation } from "@tanstack/react-query";

import ShoutService from "@/infrastructure/shout";

interface CreateShoutReplyInput {
  shoutId: string;
  replyId: string;
}

export function useCreateShoutReply() {
  return useMutation({
    mutationFn: (input: CreateShoutReplyInput) =>
      ShoutService.createReply(input),
  });
}
