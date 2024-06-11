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

export interface CreateShoutInput {
  message: string;
  imageId?: string;
}

export interface CreateShoutReplyInput {
  shoutId: string;
  replyId: string;
}
