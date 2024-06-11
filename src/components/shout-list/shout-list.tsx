import { Shout } from "@/components/shout";
import { Image, Shout as IShout, User } from "@/domain";

interface ShoutListProps {
  shouts: IShout[];
  images: Image[];
  users: User[];
}

export function ShoutList({ shouts, users, images }: ShoutListProps) {
  return (
    <ul className="flex flex-col gap-4 items-center">
      {shouts.map((shout) => {
        const author = users.find((u) => u.id === shout.authorId);
        const image = shout.imageId
          ? images.find((i) => i.id === shout.imageId)
          : undefined;
        return (
          <li key={shout.id} className="max-w-sm w-full">
            <Shout shout={shout} author={author} image={image} />
          </li>
        );
      })}
    </ul>
  );
}
