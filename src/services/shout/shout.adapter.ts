import { CreateReplyParams, PostReplyApi } from "./shout.interfaces";

export async function createReply(
  postReply: PostReplyApi,
  params: CreateReplyParams
) {
  await postReply(params);
}
