import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";

import { useGetUserProfile } from "@/application/get-user-profile";
import { LoadingSpinner } from "@/components/loading";
import { ShoutList } from "@/components/shout-list";
import { Image, Shout, User } from "@/domain";

import { UserInfo } from "./user-info";

export function UserProfile() {
  const { handle } = useParams<{ handle: string }>();
  const getUserProfile = useGetUserProfile();

  const [profile, setProfile] = useState<{
    user: User;
    shouts: Shout[];
    images: Image[];
  }>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!handle) {
      return;
    }

    getUserProfile({ handle })
      .then((profile) => setProfile(profile))
      .catch(() => setHasError(true));
  }, [handle, getUserProfile]);

  if (!handle) {
    return <Navigate to="/" />;
  }

  if (hasError) {
    return <div>An error occurred</div>;
  }
  if (!profile) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-2xl w-full mx-auto flex flex-col p-6 gap-6">
      <UserInfo user={profile.user} />
      <ShoutList
        users={[profile.user]}
        shouts={profile.shouts}
        images={profile.images}
      />
    </div>
  );
}
