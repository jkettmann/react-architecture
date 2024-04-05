import { apiClient } from "./client";
import { ShoutDto, CreateShoutInput, CreateShoutReplyInput } from "./dtos";

async function createShout(input: CreateShoutInput) {
  const response = await apiClient.post<{ data: ShoutDto }>(`/shout`, input);
  const shout = response.data.data;
  return shout;
}

async function createReply({ shoutId, replyId }: CreateShoutReplyInput) {
  const response = await apiClient.post<{ data: ShoutDto }>(
    `/shout/${shoutId}/reply`,
    { replyId }
  );
  const reply = response.data.data;
  return reply;
}

export default { createShout, createReply };
