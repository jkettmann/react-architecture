import { User } from "@/domain/user";

export interface Me extends User {
  numShoutsPastDay: number;
}

export function isAuthenticated(me?: Me) {
  return Boolean(me);
}
