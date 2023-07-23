import { Heart, Repeat2, MessageCircle } from "lucide-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ReplyDialog } from "./reply-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as IImage, Shout as IShout, User } from "@/types";
import { Link } from "react-router-dom";

type ShoutProps = {
  shout: IShout;
  author?: User;
  image?: IImage;
};

const defaultAuthor: User = {
  id: "invalid",
  type: "user",
  attributes: {
    handle: "Deleted",
    avatar:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptOSAxMmMwIDEuOTQtLjYyNCAzLjczNS0xLjY3MiA1LjIwN2wtMTIuNTM1LTEyLjUzNWMxLjQ3Mi0xLjA0OCAzLjI2Ny0xLjY3MiA1LjIwNy0xLjY3MiA0Ljk2MiAwIDkgNC4wMzggOSA5em0tMTggMGMwLTEuOTQuNjI0LTMuNzM1IDEuNjcyLTUuMjA3bDEyLjUzNCAxMi41MzRjLTEuNDcxIDEuMDQ5LTMuMjY2IDEuNjczLTUuMjA2IDEuNjczLTQuOTYyIDAtOS00LjAzOC05LTl6Ii8+PC9zdmc+",
  },
};

export function Shout({ shout, author = defaultAuthor, image }: ShoutProps) {
  return (
    <Card key={shout.id} className="w-full">
      <Link to={`/user/${author.attributes.handle}`}>
        <CardHeader className="pb-2 flex-row gap-2">
          <img
            className="w-8 h-8 rounded-full"
            src={author.attributes.avatar}
            alt={author.attributes.handle}
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
        {image && (
          <img
            className="mt-4 object-contain"
            style={{ width: 350, maxHeight: 200 }}
            src={image.attributes.url}
            alt=""
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-3 border-t-neutral-300">
        <ReplyDialog shoutId={shout.id}>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            {shout.relationships.replies.length}
          </Button>
        </ReplyDialog>
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
