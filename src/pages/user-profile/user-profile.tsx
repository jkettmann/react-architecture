import { Navigate, useParams } from "react-router";

import { useGetUserProfile } from "@/application/get-user-profile";
import { LoadingSpinner } from "@/components/loading";
import { ShoutList } from "@/components/shout-list";

import { UserInfo } from "./user-info";

export function UserProfile() {
  const { handle } = useParams<{ handle: string }>();
  const profile = useGetUserProfile({ handle });

  if (!handle) {
    return <Navigate to="/" />;
  }

  if (profile.isLoading) {
    return <LoadingSpinner />;
  }
  if (profile.error || !profile.user || !profile.shouts || !profile.images) {
    return <div>An error occurred</div>;
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
