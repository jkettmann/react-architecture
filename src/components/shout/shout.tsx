import { formatDistanceToNow } from "date-fns";
import { Heart, Repeat2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Image } from "@/domain/media";
import { Shout as IShout } from "@/domain/shout";
import { User, fallbackAuthor } from "@/domain/user";

import { ReplyDialog } from "./reply-dialog";

interface ShoutProps {
  shout: IShout;
  author?: User;
  image?: Image;
}

export function Shout({ shout, author = fallbackAuthor, image }: ShoutProps) {
  return (
    <Card key={shout.id} className="w-full">
      <Link to={`/user/${author.handle}`}>
        <CardHeader className="pb-2 flex-row gap-2">
          <img
            className="w-8 h-8 rounded-full"
            src={author.avatar}
            alt={author.handle}
          />
          <span className="font-semibold">{`@${author.handle}`}</span>
          <span className="flex-1 text-right text-xs text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(new Date(shout.createdAt), {
              includeSeconds: false,
            })}{" "}
            ago
          </span>
        </CardHeader>
      </Link>
      <CardContent>
        <CardDescription>{shout.text}</CardDescription>
        {image && (
          <img
            className="mt-4 object-contain"
            style={{ width: 350, maxHeight: 200 }}
            src={image.url}
            alt=""
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-3 border-t-neutral-300">
        <ReplyDialog shoutId={shout.id} recipientHandle={author.handle}>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            {shout.replies.length}
          </Button>
        </ReplyDialog>
        <Button variant="ghost" size="sm" className="gap-2">
          <Heart className="h-4 w-4" />
          {shout.likes}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Repeat2 className="h-4 w-4" />
          {shout.reshouts}
        </Button>
      </CardFooter>
    </Card>
  );
}
