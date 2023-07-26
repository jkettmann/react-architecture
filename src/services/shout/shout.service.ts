import * as adapter from "./shout.adapter";
import * as api from "./shout.api";
import {
  CreateReplyParams,
  CreateShoutParams,
  GetByUserParams,
} from "./shout.interfaces";

export function createReply(params: CreateReplyParams) {
  return api.createReply(params);
}

export function createShout(params: CreateShoutParams) {
  return adapter.createShout(api.createShout, params);
}

export function getByUser(params: GetByUserParams) {
  return adapter.getByUser(api.getShoutsByUser, params);
}
