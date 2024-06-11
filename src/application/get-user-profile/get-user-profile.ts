import { useCallback } from "react";

import UserService from "@/infrastructure/user";

interface GetUserProfileInput {
  handle: string;
}

const dependencies = {
  getUser: UserService.getUser,
  getUserShouts: UserService.getUserShouts,
};

export async function getUserProfile(
  { handle }: GetUserProfileInput,
  { getUser, getUserShouts }: typeof dependencies
) {
  const [user, userShouts] = await Promise.all([
    getUser(handle),
    getUserShouts(handle),
  ]);
  return { user, shouts: userShouts?.shouts, images: userShouts?.images };
}

export function useGetUserProfile() {
  return useCallback(
    (input: GetUserProfileInput) => getUserProfile(input, dependencies),
    []
  );
}
