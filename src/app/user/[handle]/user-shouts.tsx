import { ShoutList } from "@/components/shout-list";
import { useGetShoutsByUser } from "@/hooks/useGetShoutsByUser";
import { useGetUser } from "@/hooks/useGetUser";

type UserShoutsProps = {
  handle: string;
};

export function UserShouts({ handle }: UserShoutsProps) {
  const user = useGetUser(handle);
  const shouts = useGetShoutsByUser(handle);

  if (shouts.isError || user.isError) {
    return <div>An error occurred</div>;
  }
  if (!shouts.data || !user.data) {
    return <div>Loading...</div>;
  }

  return (
    <ShoutList
      shouts={shouts.data.data}
      images={shouts.data.included}
      users={[user.data.data]}
    />
  );
}
