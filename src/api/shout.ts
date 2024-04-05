import { CreateShoutInput, CreateShoutReplyInput, Shout } from "@/types";

import { apiClient } from "./client";

async function createShout(input: CreateShoutInput) {
  const response = await apiClient.post<{ data: Shout }>(`/shout`, input);
  return response.data;
}

async function createReply({ shoutId, replyId }: CreateShoutReplyInput) {
  const response = await apiClient.post<{ data: Shout }>(
    `/shout/${shoutId}/reply`,
    { replyId }
  );
  return response.data;
}

export default { createShout, createReply };
