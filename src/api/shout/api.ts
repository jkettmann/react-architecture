import { apiClient } from "../client";

import { CreateShoutInput, CreateShoutReplyInput, ShoutDto } from "./dto";

async function createShout(input: CreateShoutInput) {
  const response = await apiClient.post<{ data: ShoutDto }>(`/shout`, input);
  return response.data;
}

async function createReply({ shoutId, replyId }: CreateShoutReplyInput) {
  const response = await apiClient.post<{ data: ShoutDto }>(
    `/shout/${shoutId}/reply`,
    { replyId }
  );
  return response.data;
}

export default { createShout, createReply };
