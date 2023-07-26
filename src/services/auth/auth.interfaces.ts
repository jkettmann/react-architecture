import { UserHandle, UserId } from "@/domain/user";
import { UserDto } from "../user/user.interfaces";

export interface LoginParams {
  handle: UserHandle;
  password: string;
}

export interface LoginParamsDto {
  username: UserHandle;
  password: string;
}

export type LoginApi = (params: LoginParamsDto) => Promise<void>;

export type LogoutApi = () => Promise<void>;

export interface MeDto extends UserDto {
  relationships: {
    followerIds: UserId[];
  };
}

export interface GetMeResponse {
  data: MeDto;
}

export type GetMeApi = () => Promise<GetMeResponse>;
