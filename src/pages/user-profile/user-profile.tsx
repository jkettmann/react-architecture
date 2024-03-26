import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { Image, Shout, User } from "@/types";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ShoutList } from "@/components/shout-list";
import { UserInfo } from "./user-info";

type UserResponse = {
  data: User;
};

type UserShoutsResponse = {
  data: Shout[];
  included: Image[];
};

export function UserProfile() {
  const { handle } = useParams<{ handle: string }>();

  const [user, setUser] = useState<UserResponse>();
  const [userShouts, setUserShouts] = useState<UserShoutsResponse>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axios
      .get<UserResponse>(`/api/user/${handle}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setHasError(true);
      });

    axios
      .get<UserShoutsResponse>(`/api/user/${handle}/shouts`)
      .then((response) => {
        setUserShouts(response.data);
      })
      .catch(() => {
        setHasError(true);
      });
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
