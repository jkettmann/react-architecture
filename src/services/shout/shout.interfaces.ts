import { ImageId } from "@/domain/image";
import { ShoutId } from "@/domain/shout";
import { UserHandle, UserId } from "@/domain/user";
import { ImageDto } from "../image/image.interfaces";

export interface ShoutDto {
  id: ShoutId;
  type: "shout";
  createdAt: number;
  attributes: {
    authorId: UserId;
    text: string;
    likes: number;
    reshouts: number;
    imageId?: ImageId;
  };
  relationships: {
    replies: ShoutId[];
    replyTo?: ShoutId;
  };
}

export interface CreateReplyParams {
  shoutId: ShoutId;
  replyId: ShoutId;
}

export type CreateReplyApi = (params: CreateReplyParams) => Promise<void>;

export interface CreateShoutParams {
  message: string;
  imageId?: ImageId;
}

export interface CreateShoutResponseDto {
  data: ShoutDto;
}

export type CreateShoutApi = (
  params: CreateShoutParams
) => Promise<CreateShoutResponseDto>;

export interface GetByUserParams {
  handle: UserHandle;
}

export interface GetByUserResponseDto {
  data: ShoutDto[];
  included: ImageDto[];
}

export type GetByUserApi = (
  params: GetByUserParams
) => Promise<GetByUserResponseDto>;
