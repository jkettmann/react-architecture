import { Shout as TShout, Image } from "@/ui/types";
import { Shout } from "@/ui/components/shout";
import { User } from "@/domain/user";

type ShoutListProps = {
  shouts: TShout[];
  images: Image[];
  users: User[];
};

export function ShoutList({ shouts, users, images }: ShoutListProps) {
  return (
    <ul className="flex flex-col gap-4 items-center">
      {shouts.map((shout) => {
        const author = users.find((u) => u.id === shout.attributes.authorId);
        const image = shout.attributes.imageId
          ? images.find((i) => i.id === shout.attributes.imageId)
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
