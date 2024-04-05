export interface User {
  id: string;
  handle: string;
  avatar: string;
  info?: string;
  followerIds: string[];
}

export interface Me extends User {}

export interface Shout {
  id: string;
  createdAt: number;
  authorId: string;
  text: string;
  likes: number;
  reshouts: number;
  imageId?: string;
  replies: string[];
  replyTo?: string;
}

export interface Image {
  id: string;
  url: string;
}
