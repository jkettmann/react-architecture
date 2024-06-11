import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";

import UserApi from "@/api/user";
import { LoadingSpinner } from "@/components/loading";
import { ShoutList } from "@/components/shout-list";
import { UserResponse, UserShoutsResponse } from "@/types";

import { UserInfo } from "./user-info";

export function UserProfile() {
  const { handle } = useParams<{ handle: string }>();

  const [user, setUser] = useState<UserResponse>();
  const [userShouts, setUserShouts] = useState<UserShoutsResponse>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!handle) {
      return;
    }

    UserApi.getUser(handle)
      .then((response) => setUser(response))
      .catch(() => setHasError(true));

    UserApi.getUserShouts(handle)
      .then((response) => setUserShouts(response))
      .catch(() => setHasError(true));
  }, [handle]);

  if (!handle) {
    return <Navigate to="/" />;
  }

  if (hasError) {
    return <div>An error occurred</div>;
  }
  if (!user || !userShouts) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-2xl w-full mx-auto flex flex-col p-6 gap-6">
      <UserInfo user={user.data} />
      <ShoutList
        users={[user.data]}
        shouts={userShouts.data}
        images={userShouts.included}
      />
    </div>
  );
}
