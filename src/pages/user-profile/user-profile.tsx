import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";

import { ImageDto } from "@/api/media/dto";
import { ShoutDto } from "@/api/shout/dto";
import UserApi from "@/api/user";
import { UserDto } from "@/api/user/dto";
import { LoadingSpinner } from "@/components/loading";
import { ShoutList } from "@/components/shout-list";

import { UserInfo } from "./user-info";

export function UserProfile() {
  const { handle } = useParams<{ handle: string }>();

  const [user, setUser] = useState<UserDto>();
  const [shouts, setShouts] = useState<ShoutDto[]>();
  const [images, setImages] = useState<ImageDto[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!handle) {
      return;
    }

    UserApi.getUser(handle)
      .then((user) => setUser(user))
      .catch(() => setHasError(true));

    UserApi.getUserShouts(handle)
      .then(({ shouts, images }) => {
        setShouts(shouts);
        setImages(images);
      })
      .catch(() => setHasError(true));
  }, [handle]);

  if (!handle) {
    return <Navigate to="/" />;
  }

  if (hasError) {
    return <div>An error occurred</div>;
  }
  if (!user || !shouts) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-2xl w-full mx-auto flex flex-col p-6 gap-6">
      <UserInfo user={user} />
      <ShoutList users={[user]} shouts={shouts} images={images} />
    </div>
  );
}
