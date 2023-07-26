export type UserId = Flavor<string, "UserId">;
export type UserHandle = Flavor<string, "UserHandle">;

export interface User {
  id: UserId;
  type: "user";
  handle: UserHandle;
  avatar: string;
  info?: string;
}
