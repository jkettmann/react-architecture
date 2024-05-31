type UserId = string;
type ShoutId = string;
type ImageId = string;

export interface DbUser {
  id: UserId;
  type: "user";
  attributes: {
    handle: string;
    avatar: string;
    info?: string;
    numShoutsPastDay: number;
    blockedUserIds: UserId[];
    followsUserIds: UserId[];
  };
}

export interface UserDto extends DbUser {
  relationships: {
    followerIds: UserId[];
    me?: {
      attributes: {
        isBlocked: boolean;
        isFollowing: boolean;
      };
    };
  };
}

export interface MeDto extends UserDto {}

export interface DbShout {
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

export interface DbImage {
  id: ImageId;
  type: "image";
  attributes: {
    url: string;
  };
}

export interface DbFeedResponse {
  data: DbShout[];
  included: (DbUser | DbImage)[];
}
