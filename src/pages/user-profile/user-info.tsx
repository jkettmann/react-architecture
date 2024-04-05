import { UserDto } from "@/api/user/dto";

interface UserInfoProps {
  user: UserDto;
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <section className="flex gap-4">
      <img
        className="w-48 h-48 rounded-full"
        src={user.attributes.avatar}
        alt={`${user.attributes.handle}'s avatar`}
      />
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">@{user.attributes.handle}</h1>
          <span className="text-sm text-gray-600">
            ({user.relationships.followerIds.length} follower)
          </span>
        </div>
        <p>{user.attributes.info || "Shush! I'm a ghost."}</p>
      </div>
    </section>
  );
}
