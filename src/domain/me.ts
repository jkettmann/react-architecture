import { User } from "./user";

export interface Me extends User {
  followers: User[];
  numFollowers: number;
}
