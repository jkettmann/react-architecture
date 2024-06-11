import { useCallback } from "react";

import MediaService from "@/infrastructure/media";
import ShoutService from "@/infrastructure/shout";
import UserService from "@/infrastructure/user";

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
  UnknownError: "An unknown error occurred. Please try again later.",
} as const;

const dependencies = {
  getMe: UserService.getMe,
  getUser: UserService.getUser,
  saveImage: MediaService.saveImage,
  createShout: ShoutService.createShout,
  createReply: ShoutService.createReply,
};

export async function replyToShout(
  { recipientHandle, shoutId, message, files }: ReplyToShoutInput,
  { getMe, getUser, saveImage, createReply, createShout }: typeof dependencies
) {
  const me = await getMe();
  if (me.numShoutsPastDay >= 5) {
    return { error: ErrorMessages.TooManyShouts };
  }

  const recipient = await getUser(recipientHandle);
  if (!recipient) {
    return { error: ErrorMessages.RecipientNotFound };
  }
  if (recipient.blockedUserIds.includes(me.id)) {
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

export function useReplyToShout() {
  return useCallback(
    (input: ReplyToShoutInput) => replyToShout(input, dependencies),
    []
  );
}
