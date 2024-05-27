import MediaService from "@/infrastructure/media";
import ShoutService from "@/infrastructure/shout";
import UserService from "@/infrastructure/user";

interface ReplyToShoutInput {
  recipientHandle: string;
  shoutId: string;
  message: string;
  files?: File[] | null;
}

const ErrorMessages = {
  TooManyShouts:
    "You have reached the maximum number of shouts per day. Please try again tomorrow.",
  RecipientNotFound: "The user you want to reply to does not exist.",
  AuthorBlockedByRecipient:
    "You can't reply to this user. They have blocked you.",
  UnknownError: "An unknown error occurred. Please try again later.",
} as const;

export async function replyToShout({
  recipientHandle,
  shoutId,
  message,
  files,
}: ReplyToShoutInput) {
  const me = await UserService.getMe();
  if (me.numShoutsPastDay >= 5) {
    return { error: ErrorMessages.TooManyShouts };
  }

  const recipient = await UserService.getUser(recipientHandle);
  if (!recipient) {
    return { error: ErrorMessages.RecipientNotFound };
  }
  if (recipient.blockedUserIds.includes(me.id)) {
    return { error: ErrorMessages.AuthorBlockedByRecipient };
  }

  try {
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

    return { error: undefined };
  } catch {
    return { error: ErrorMessages.UnknownError };
  }
}
