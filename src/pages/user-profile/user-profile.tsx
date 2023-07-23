import { Navigate, useParams } from "react-router";
import { UserInfo } from "./user-info";
import { UserShouts } from "./user-shouts";

export function UserProfile() {
  const { handle } = useParams<{ handle: string }>();

  if (!handle) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-2xl w-full mx-auto flex flex-col p-6 gap-6">
      <UserInfo handle={handle} />
      <UserShouts handle={handle} />
    </div>
  );
}
