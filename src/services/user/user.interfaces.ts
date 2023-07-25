import { UserId } from "@/domain/user";

export interface UserDto {
  id: UserId;
  type: "user";
  attributes: {
    handle: string;
    avatar: string;
    info?: string;
  };
}
