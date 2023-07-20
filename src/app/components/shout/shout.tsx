import * as React from "react";
import { Heart, Repeat2, MessageCircle } from "lucide-react";
import Link from "next/link";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shout, User } from "@/types";

type ShoutProps = {
  shout: Shout;
  author: User;
};

export function Shout({ shout, author }: ShoutProps) {
  return (
    <Card key={shout.id} className="w-[350px]">
      <Link href={`/u/${author.attributes.handle}`}>
        <CardHeader className="pb-2 flex-row gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={author.attributes.avatar}
            alt={author.attributes.handle}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-semibold">
            {`@${author.attributes.handle}`}
          </span>
          <span className="flex-1 text-right text-xs text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(new Date(shout.createdAt), {
              includeSeconds: false,
            })}{" "}
            ago
          </span>
        </CardHeader>
      </Link>
      <CardContent>
        <CardDescription>{shout.attributes.text}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between p-3 border-t-neutral-300">
        <Button variant="ghost" size="sm" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          {shout.attributes.replies}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Heart className="h-4 w-4" />
          {shout.attributes.likes}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Repeat2 className="h-4 w-4" />
          {shout.attributes.reshouts}
        </Button>
      </CardFooter>
    </Card>
  );
}
