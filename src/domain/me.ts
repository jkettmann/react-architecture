import { User, UserId } from "./user";

export interface Me extends User {
  followerIds: UserId[];
}
