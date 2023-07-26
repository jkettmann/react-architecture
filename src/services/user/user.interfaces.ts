import { UserHandle, UserId } from "@/domain/user";

export interface UserDto {
  id: UserId;
  type: "user";
  attributes: {
    handle: UserHandle;
    avatar: string;
    info?: string;
  };
}

export interface GetUserParams {
  handle: UserHandle;
}

export interface GetUserDto {
  data: UserDto;
}

export type GetUserApi = (params: GetUserParams) => Promise<GetUserDto>;
