import { useGetUser } from "../queries/get-user";
import { useGetUserShouts } from "../queries/get-user-shouts";

interface GetUserProfileInput {
  handle?: string;
}

export function useGetUserProfile({ handle }: GetUserProfileInput) {
  const user = useGetUser({ handle });
  const userShouts = useGetUserShouts({ handle });
  return {
    user: user.data,
    shouts: userShouts.data?.shouts,
    images: userShouts.data?.images,
    isLoading: user.isLoading || userShouts.isLoading,
    error: user.error || userShouts.error,
  };
}
