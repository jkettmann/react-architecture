export type UserId = Flavor<string, "UserId">;

export interface User {
  id: UserId;
  type: "user";
  handle: string;
  avatar: string;
  info?: string;
}
