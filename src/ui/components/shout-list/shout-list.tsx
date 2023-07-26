import { Shout } from "@/ui/components/shout";
import { ShoutAggregate } from "@/domain/shout";
import { User } from "@/domain/user";

type ShoutListProps = {
  shouts: ShoutAggregate[];
  author?: User;
};

export function ShoutList({ shouts, author }: ShoutListProps) {
  return (
    <ul className="flex flex-col gap-4 items-center">
      {shouts.map((shout) => {
        return (
          <li key={shout.id} className="max-w-sm w-full">
            <Shout shout={shout} author={author} />
          </li>
        );
      })}
    </ul>
  );
}
