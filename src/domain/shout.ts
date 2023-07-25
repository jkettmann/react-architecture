import { Image } from "@/ui/types";
import { User } from "./user";

export type ShoutId = Flavor<string, "ShoutId">;

export interface Shout {
  id: ShoutId;
  type: "shout";
  createdAt: number;
  author: User;
  text: string;
  likes: number;
  reshouts: number;
  image?: Image;
  replies: Shout[];
  replyTo?: Shout;
}
