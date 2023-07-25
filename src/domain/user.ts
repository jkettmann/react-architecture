type UserId = string;

export interface User {
  id: UserId;
  type: "user";
  handle: string;
  avatar: string;
  info?: string;
}
