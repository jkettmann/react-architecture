type UserId = string;
type ShoutId = string;
type ImageId = string;

export interface User {
  id: UserId;
  type: "user";
  attributes: {
    handle: string;
    avatar: string;
    info?: string;
  };
}

export interface Me extends User {
  relationships: {
    followerIds: UserId[];
  };
}

export interface Shout {
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

export interface Image {
  id: ImageId;
  type: "image";
  attributes: {
    url: string;
  };
}

export interface ShoutsByUserResponse {
  data: Shout[];
  included: Image[];
}
