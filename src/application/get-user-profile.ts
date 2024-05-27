import UserService from "@/infrastructure/user";

interface GetUserProfileInput {
  handle: string;
}

export async function getUserProfile({ handle }: GetUserProfileInput) {
  const [user, { shouts, images }] = await Promise.all([
    UserService.getUser(handle),
    UserService.getUserShouts(handle),
  ]);
  return { user, shouts, images };
}
