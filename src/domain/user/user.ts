export interface User {
  id: string;
  handle: string;
  avatar: string;
  info?: string;
  blockedUserIds: string[];
  followerIds: string[];
}
