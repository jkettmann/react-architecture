import { User } from "@/domain/user";

export const MAX_NUM_SHOUTS_PER_DAY = 5;

export interface Me extends User {
  numShoutsPastDay: number;
}

export function isAuthenticated(me?: Me | null): me is Me {
  return Boolean(me);
}

export function hasExceededShoutLimit(me: Me) {
  return me.numShoutsPastDay >= MAX_NUM_SHOUTS_PER_DAY;
}
