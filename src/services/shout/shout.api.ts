import { apiClient } from "@/services/api-client";
import { CreateReplyParams } from "./shout.interfaces";

export async function postReply({ shoutId, replyId }: CreateReplyParams) {
  await apiClient.post(`/shout/${shoutId}/reply`, { replyId });
}
