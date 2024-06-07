import { User } from "@/domain/user";

export interface Me extends User {
  numShoutsPastDay: number;
}
