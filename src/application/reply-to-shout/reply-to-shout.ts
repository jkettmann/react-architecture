import { Me, hasExceededShoutLimit, isAuthenticated } from "@/domain/me";
import { Image } from "@/domain/media";
import { Shout } from "@/domain/shout";
import { User, hasBlockedUser } from "@/domain/user";

import { useCreateShout } from "../mutations/create-shout";
import { useCreateShoutReply } from "../mutations/create-shout-reply";
import { useSaveImage } from "../mutations/save-image";
import { useGetMe } from "../queries/get-me";
import { useGetUser } from "../queries/get-user";

interface ReplyToShoutInput {
  recipientHandle: string;
  shoutId: string;
  message: string;
  files?: File[] | null;
}

export const ErrorMessages = {
  TooManyShouts:
    "You have reached the maximum number of shouts per day. Please try again tomorrow.",
  RecipientNotFound: "The user you want to reply to does not exist.",
  AuthorBlockedByRecipient:
    "You can't reply to this user. They have blocked you.",
  NotAuthenticated: "You must be signed in to reply to a shout.",
  UnknownError: "An unknown error occurred. Please try again later.",
} as const;

interface Dependencies {
  me?: Me | null;
  recipient?: User | null;
  saveImage: (file: File) => Promise<Image>;
  createShout: (input: { message: string; imageId?: string }) => Promise<Shout>;
  createReply: (input: { shoutId: string; replyId: string }) => Promise<Shout>;
}

export async function replyToShout(
  { shoutId, message, files }: ReplyToShoutInput,
  { me, recipient, saveImage, createReply, createShout }: Dependencies
) {
  if (!isAuthenticated(me)) {
    return { error: ErrorMessages.NotAuthenticated };
  }
  if (hasExceededShoutLimit(me)) {
    return { error: ErrorMessages.TooManyShouts };
  }

  if (!recipient) {
    return { error: ErrorMessages.RecipientNotFound };
  }
  if (hasBlockedUser(recipient, me.id)) {
    return { error: ErrorMessages.AuthorBlockedByRecipient };
  }

  try {
    let image;
    if (files?.length) {
      image = await saveImage(files[0]);
    }

    const newShout = await createShout({
      message,
      imageId: image?.id,
    });

    await createReply({
      shoutId,
      replyId: newShout.id,
    });

    return { error: undefined };
  } catch {
    return { error: ErrorMessages.UnknownError };
  }
}

interface UseReplyToShoutInput {
  recipientHandle: string;
}

export function useReplyToShout({ recipientHandle }: UseReplyToShoutInput) {
  const me = useGetMe();
  const user = useGetUser({ handle: recipientHandle });
  const saveImage = useSaveImage();
  const createShout = useCreateShout();
  const createReply = useCreateShoutReply();

  return {
    mutateAsync: (input: ReplyToShoutInput) =>
      replyToShout(input, {
        me: me.data,
        recipient: user.data,
        saveImage: saveImage.mutateAsync,
        createShout: createShout.mutateAsync,
        createReply: createReply.mutateAsync,
      }),
    isLoading:
      me.isLoading ||
      user.isLoading ||
      saveImage.isPending ||
      createShout.isPending ||
      createReply.isPending,
    isError: me.isError || user.isError,
  };
}
