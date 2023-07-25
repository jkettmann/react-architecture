import { apiClient } from "@/services/api-client";
import { CreateReplyApi, CreateShoutApi } from "./shout.interfaces";

export const createReply: CreateReplyApi = async ({ shoutId, replyId }) => {
  await apiClient.post(`/shout/${shoutId}/reply`, { replyId });
};

export const createShout: CreateShoutApi = async (params) => {
  const res = await apiClient.post(`/shout`, params);
  return res.data;
};
