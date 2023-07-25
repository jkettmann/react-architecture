import * as api from "./shout.api";
import { CreateReplyParams } from "./shout.interfaces";

export function createReply(params: CreateReplyParams) {
  return api.postReply(params);
}
