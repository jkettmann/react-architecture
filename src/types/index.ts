/* DATA TYPES */
export interface User {
  id: string;
  type: "user";
  attributes: {
    handle: string;
    avatar: string;
    info?: string;
  };
  relationships: {
    followerIds: string[];
  };
}

export interface Me extends User {}

export interface Shout {
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

export interface Image {
  id: string;
  type: "image";
  attributes: {
    url: string;
  };
}

/* RESPONSE TYPES */
export interface FeedResponse {
  data: Shout[];
  included: (User | Image)[];
}

export interface UserResponse {
  data: User;
}

export interface UserShoutsResponse {
  data: Shout[];
  included: Image[];
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
