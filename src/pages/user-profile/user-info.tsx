import { User } from "@/types";

type UserInfoProps = {
  user: User;
};

export function UserInfo({ user }: UserInfoProps) {
  return (
    <section className="flex gap-4">
      <img
        className="w-48 h-48 rounded-full"
        src={user.attributes.avatar}
        alt={`${user.attributes.handle}'s avatar`}
      />
      <div>
        <h1 className="text-xl font-bold">@{user.attributes.handle}</h1>
        <p className="">{user.attributes.info || "Shush! I'm a ghost."}</p>
      </div>
    </section>
  );
}
