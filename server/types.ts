type UserId = string;
type ShoutId = string;
type ImageId = string;

export type DbUser = {
  id: UserId;
  type: "user";
  attributes: {
    handle: string;
    avatar: string;
    info?: string;
  };
};

export type DbShout = {
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

export type DbImage = {
  id: ImageId;
  type: "image";
  attributes: {
    url: string;
  };
};

export type DbFeedResponse = {
  data: DbShout[];
  included: (DbUser | DbImage)[];
};
