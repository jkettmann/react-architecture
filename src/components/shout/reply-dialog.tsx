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

interface ReplyFormElements extends HTMLFormControlsCollection {
  message: HTMLTextAreaElement;
  image: HTMLInputElement;
}

interface ReplyForm extends HTMLFormElement {
  readonly elements: ReplyFormElements;
}

interface ReplyDialogProps {
  children: React.ReactNode;
  shoutId: string;
}

export function ReplyDialog({ children, shoutId }: ReplyDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasError, setHasError] = useState(false);

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
      console.error(error);
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
