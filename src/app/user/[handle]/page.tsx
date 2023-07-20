"use client";

import { UserInfo } from "./user-info";
import { UserShouts } from "./user-shouts";

type UserProfileProps = {
  params: {
    handle: string;
  };
};

export default function UserProfile({ params }: UserProfileProps) {
  return (
    <>
      <UserInfo handle={params.handle} />
      <UserShouts handle={params.handle} />
    </>
  );
}
