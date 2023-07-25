import { UserId } from "@/domain/user";

export interface GetUserParams {
  handle: string;
}

export interface GetUserDto {
  data: {
    id: UserId;
    type: "user";
    attributes: {
      handle: string;
      avatar: string;
      info?: string;
    };
  };
}

export type GetUserApi = (params: GetUserParams) => Promise<GetUserDto>;
