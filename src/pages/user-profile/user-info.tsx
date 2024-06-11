import { User } from "@/domain/user";

interface UserInfoProps {
  user: User;
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <section className="flex gap-4">
      <img
        className="w-48 h-48 rounded-full"
        src={user.avatar}
        alt={`${user.handle}'s avatar`}
      />
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">@{user.handle}</h1>
          <span className="text-sm text-gray-600">
            ({user.followerIds.length} follower)
          </span>
        </div>
        <p>{user.info || "Shush! I'm a ghost."}</p>
      </div>
    </section>
  );
}
