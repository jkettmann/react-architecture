"use client";

import * as React from "react";
import { User, Shout as TShout, Image } from "@/types";
import { Shout } from "@/components/shout";

type ShoutListProps = {
  shouts: TShout[];
  images: Image[];
  users: User[];
};

export function ShoutList({ shouts, users }: ShoutListProps) {
  return (
    <ul className="flex flex-col gap-4 items-center">
      {shouts.map((shout) => {
        const author = users.find((u) => u.id === shout.attributes.authorId);
        return (
          <li key={shout.id} className="max-w-sm w-full">
            <Shout shout={shout} author={author} />
          </li>
        );
      })}
    </ul>
  );
}
