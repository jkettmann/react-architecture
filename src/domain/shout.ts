import { Image, ImageId } from "./image";
import { User, UserId } from "./user";

export type ShoutId = Flavor<string, "ShoutId">;

export interface Shout {
  id: ShoutId;
  type: "shout";
  createdAt: number;
  authorId: UserId;
  text: string;
  likes: number;
  reshouts: number;
  imageId?: ImageId;
  replies: ShoutId[];
  replyTo?: ShoutId;
}

export interface ShoutAggregate extends Shout {
  author?: User;
  image?: Image;
}

export function getStats(shout: Shout) {
  return {
    likes: shout.likes,
    reshouts: shout.reshouts,
    replies: shout.replies.length,
  };
}
