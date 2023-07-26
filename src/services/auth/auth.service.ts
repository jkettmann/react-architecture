import * as adapter from "./auth.adapter";
import * as api from "./auth.api";
import { LoginParams } from "./auth.interfaces";

export function login(params: LoginParams) {
  return adapter.login(api.login, params);
}

export function logout() {
  return api.logout();
}

export function getMe() {
  return adapter.getMe(api.getMe);
}
