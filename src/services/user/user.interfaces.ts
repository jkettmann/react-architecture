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

export interface GetUserParams {
  handle: string;
}

export interface GetUserDto {
  data: UserDto;
}

export type GetUserApi = (params: GetUserParams) => Promise<GetUserDto>;
