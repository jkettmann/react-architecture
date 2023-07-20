type UserId = string;
type ShoutId = string;
type ImageId = string;

export type User = {
  id: UserId;
  type: "user";
  attributes: {
    handle: string;
    avatar: string;
    info?: string;
  };
};

export type Shout = {
  id: ShoutId;
  type: "shout";
  createdAt: number;
  attributes: {
    authorId: UserId;
    text: string;
    replies: number;
    likes: number;
    reshouts: number;
    imageId?: ImageId;
  };
};

export type Image = {
  id: ImageId;
  type: "image";
  attributes: {
    url: string;
  };
};

export type ShoutsByUserResponse = {
  data: Shout[];
  included: Image[];
};
