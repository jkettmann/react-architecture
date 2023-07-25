import { LoadingSpinner } from "@/ui/components/loading-spinner";
import { ShoutList } from "@/ui/components/shout-list";
import { useGetShoutsByUser } from "@/ui/hooks/use-get-shouts-by-user";
import { User } from "@/domain/user";

type UserShoutsProps = {
  user: User;
};

export function UserShouts({ user }: UserShoutsProps) {
  const shouts = useGetShoutsByUser(user.handle);

  if (shouts.isError) {
    return <div>An error occurred</div>;
  }
  if (!shouts.data) {
    return <LoadingSpinner />;
  }

  return (
    <ShoutList
      shouts={shouts.data.data}
      images={shouts.data.included}
      users={[user]}
    />
  );
}
