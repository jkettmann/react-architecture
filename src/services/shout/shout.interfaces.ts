export interface CreateReplyParams {
  shoutId: string;
  replyId: string;
}

export type PostReplyApi = (params: CreateReplyParams) => Promise<void>;
