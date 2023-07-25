import { GetUserParams } from "./user.interfaces";
import * as adapter from "./user.adapter";
import * as api from "./user.api";

export function getUser(params: GetUserParams) {
  return adapter.getUser(api.getUser, params);
}
