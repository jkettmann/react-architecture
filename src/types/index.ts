export interface User {
  id: string;
  type: "user";
  attributes: {
    handle: string;
    avatar: string;
    info?: string;
  };
}

export interface Me extends User {
  relationships: {
    followerIds: string[];
  };
}

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
