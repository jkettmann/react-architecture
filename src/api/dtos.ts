/* DATA TYPES */
export interface UserDto {
  id: string;
  type: "user";
  attributes: {
    handle: string;
    avatar: string;
    info?: string;
  };
}

export interface MeDto extends UserDto {
  relationships: {
    followerIds: string[];
  };
}

export interface ShoutDto {
  id: string;
  type: "shout";
  createdAt: number;
  attributes: {
    authorId: string;
    text: string;
    likes: number;
    reshouts: number;
    imageId?: string;
  };
  relationships: {
    replies: string[];
    replyTo?: string;
  };
}

export interface ImageDto {
  id: string;
  type: "image";
  attributes: {
    url: string;
  };
}

/* RESPONSE TYPES */
export interface FeedResponse {
  data: ShoutDto[];
  included: (UserDto | ImageDto)[];
}

export interface UserResponse {
  data: UserDto;
}

export interface UserShoutsResponse {
  data: ShoutDto[];
  included: ImageDto[];
}

/* INPUT TYPES */
export interface Credentials {
  username: string;
  password: string;
}

export interface CreateShoutInput {
  message: string;
  imageId?: string;
}

export interface CreateShoutReplyInput {
  shoutId: string;
  replyId: string;
}
