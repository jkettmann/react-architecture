import { apiClient } from "../client";

import { CreateShoutInput, CreateShoutReplyInput, ShoutDto } from "./dto";
import { dtoToShout } from "./transform";

async function createShout(input: CreateShoutInput) {
  const response = await apiClient.post<{ data: ShoutDto }>(`/shout`, input);
  const shoutDto = response.data.data;
  return dtoToShout(shoutDto);
}

async function createReply({ shoutId, replyId }: CreateShoutReplyInput) {
  const response = await apiClient.post<{ data: ShoutDto }>(
    `/shout/${shoutId}/reply`,
    { replyId }
  );
  const replyDto = response.data.data;
  return dtoToShout(replyDto);
}

export default { createShout, createReply };
