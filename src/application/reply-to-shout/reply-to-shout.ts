import { hasExceededShoutLimit, isAuthenticated } from "@/domain/me";
import { hasBlockedUser } from "@/domain/user";

import { useCreateShout } from "../mutations/use-create-shout";
import { useCreateShoutReply } from "../mutations/use-create-shout-reply";
import { useSaveImage } from "../mutations/use-save-image";
import { useGetMe } from "../queries/use-get-me";
import { useGetUser } from "../queries/use-get-user";

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
  me: ReturnType<typeof useGetMe>["data"];
  recipient: ReturnType<typeof useGetUser>["data"];
  saveImage: ReturnType<typeof useSaveImage>["mutateAsync"];
  createShout: ReturnType<typeof useCreateShout>["mutateAsync"];
  createReply: ReturnType<typeof useCreateShoutReply>["mutateAsync"];
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
