import { CreateShoutInput, CreateShoutReplyInput, Shout } from "@/types";

import { apiClient } from "./client";

async function createShout(input: CreateShoutInput) {
  const response = await apiClient.post<{ data: Shout }>(`/shout`, input);
  const shout = response.data.data;
  return shout;
}

async function createReply({ shoutId, replyId }: CreateShoutReplyInput) {
  const response = await apiClient.post<{ data: Shout }>(
    `/shout/${shoutId}/reply`,
    { replyId }
  );
  const reply = response.data.data;
  return reply;
}

export default { createShout, createReply };
