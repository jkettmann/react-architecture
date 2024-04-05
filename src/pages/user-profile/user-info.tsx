import { User } from "@/domain";

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
        <h1 className="text-xl font-bold">@{user.handle}</h1>
        <p className="">{user.info || "Shush! I'm a ghost."}</p>
      </div>
    </section>
  );
}
