import { useEffect, useState } from "react";

import { LoginDialog } from "@/components/login-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MediaService from "@/infrastructure/media";
import ShoutService from "@/infrastructure/shout";
import UserService from "@/infrastructure/user";

const ErrorMessages = {
  TooManyShouts:
    "You have reached the maximum number of shouts per day. Please try again tomorrow.",
  RecipientNotFound: "The user you want to reply to does not exist.",
  AuthorBlockedByRecipient:
    "You can't reply to this user. They have blocked you.",
  UnknownError: "An unknown error occurred. Please try again later.",
} as const;

interface ReplyFormElements extends HTMLFormControlsCollection {
  message: HTMLTextAreaElement;
  image: HTMLInputElement;
}

interface ReplyForm extends HTMLFormElement {
  readonly elements: ReplyFormElements;
}

interface ReplyDialogProps {
  recipientHandle: string;
  children: React.ReactNode;
  shoutId: string;
}

export function ReplyDialog({
  recipientHandle,
  children,
  shoutId,
}: ReplyDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [replyError, setReplyError] = useState<string>();

  useEffect(() => {
    UserService.getMe()
      .then((me) => setIsAuthenticated(Boolean(me)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (hasError || !isAuthenticated) {
    return <LoginDialog>{children}</LoginDialog>;
  }

  async function handleSubmit(event: React.FormEvent<ReplyForm>) {
    event.preventDefault();
    setIsLoading(true);

    const me = await UserService.getMe();
    if (me.numShoutsPastDay >= 5) {
      return setReplyError(ErrorMessages.TooManyShouts);
    }

    const recipient = await UserService.getUser(recipientHandle);
    if (!recipient) {
      return setReplyError(ErrorMessages.RecipientNotFound);
    }
    if (recipient.blockedUserIds.includes(me.id)) {
      return setReplyError(ErrorMessages.AuthorBlockedByRecipient);
    }

    try {
      const message = event.currentTarget.elements.message.value;
      const files = event.currentTarget.elements.image.files;

      let image;
      if (files?.length) {
        image = await MediaService.saveImage(files[0]);
      }

      const newShout = await ShoutService.createShout({
        message,
        imageId: image?.id,
      });

      await ShoutService.createReply({
        shoutId,
        replyId: newShout.id,
      });

      setOpen(false);
    } catch (error) {
      setReplyError(ErrorMessages.UnknownError);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Shout out loud!</DialogTitle>
          <DialogDescription>
            Shout out your darkest thoughts to the world.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Label className="space-y-2">
              <span>Message *</span>
              <Textarea
                className="col-span-3"
                name="message"
                placeholder="Message"
                required
              />
            </Label>
            <Label className="space-y-2">
              <span>Image (optional)</span>
              <Input
                className="col-span-3 cursor-pointer"
                name="image"
                type="file"
              />
            </Label>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Shout out!
            </Button>
          </DialogFooter>
          {replyError && (
            <div className="text-red-500 text-sm font-bold text-center mt-4">
              {replyError}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
