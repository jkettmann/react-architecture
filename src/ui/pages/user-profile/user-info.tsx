import { User } from "@/domain/user";

type UserInfoProps = {
  user: User;
};

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
        <p>{user.info || "Shush! I'm a ghost."}</p>
      </div>
    </section>
  );
}
