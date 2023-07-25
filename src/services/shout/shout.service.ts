import * as adapter from "./shout.adapter";
import * as api from "./shout.api";
import { CreateReplyParams, CreateShoutParams } from "./shout.interfaces";

export function createReply(params: CreateReplyParams) {
  return api.createReply(params);
}

export function createShout(params: CreateShoutParams) {
  return adapter.createShout(api.createShout, params);
}
