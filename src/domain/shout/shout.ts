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
