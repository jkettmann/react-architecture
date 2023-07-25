import { useNavigate, useParams } from "react-router";
import { UserInfo } from "./user-info";
import { UserShouts } from "./user-shouts";
import { useGetUser } from "@/ui/hooks/use-get-user";
import { LoadingSpinner } from "@/ui/components/loading-spinner";

export function UserProfile() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();

  if (!handle) {
    navigate("/");
    return null;
  }

  const user = useGetUser(handle);

  if (user.isError) {
    return <div>An error occurred</div>;
  }
  if (!user.data) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-2xl w-full mx-auto flex flex-col p-6 gap-6">
      <UserInfo user={user.data} />
      <UserShouts user={user.data} />
    </div>
  );
}
