import { beforeEach, describe, expect, it, vitest } from "vitest";

import { MAX_NUM_SHOUTS_PER_DAY } from "@/domain/me";
import { createMockFile } from "@/test/create-mock-file";

import { ErrorMessages, replyToShout } from "./reply-to-shout";

const recipientHandle = "recipient-handle";
const shoutId = "shout-id";
const message = "Hello, world!";
const files = [createMockFile("image.png")];

const imageId = "image-id";
const newShoutId = "new-shout-id";

const mockMe = {
  id: "user-1",
  handle: "me",
  avatar: "user-1.png",
  numShoutsPastDay: 0,
  blockedUserIds: [],
  followerIds: [],
};

const mockRecipient = {
  id: "user-2",
  handle: recipientHandle,
  avatar: "user-2.png",
  numShoutsPastDay: 0,
  blockedUserIds: [],
  followerIds: [],
};

const mockSaveImage = vitest.fn().mockResolvedValue({ id: imageId });
const mockCreateShout = vitest.fn().mockResolvedValue({ id: newShoutId });
const mockCreateReply = vitest.fn();

const mockDependencies = {
  me: mockMe,
  recipient: mockRecipient,
  saveImage: mockSaveImage,
  createShout: mockCreateShout,
  createReply: mockCreateReply,
};

describe("replyToShout", () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it("should return an error if the user has made too many shouts", async () => {
    const result = await replyToShout(
      { recipientHandle, shoutId, message, files },
      {
        ...mockDependencies,
        me: { ...mockMe, numShoutsPastDay: MAX_NUM_SHOUTS_PER_DAY },
      }
    );

    expect(result).toEqual({ error: ErrorMessages.TooManyShouts });
  });

  it("should return an error if the recipient does not exist", async () => {
    const result = await replyToShout(
      { recipientHandle, shoutId, message, files },
      { ...mockDependencies, recipient: null }
    );

    expect(result).toEqual({ error: ErrorMessages.RecipientNotFound });
  });

  it("should return an error if the recipient has blocked the author", async () => {
    const result = await replyToShout(
      { recipientHandle, shoutId, message, files },
      {
        ...mockDependencies,
        recipient: { ...mockRecipient, blockedUserIds: [mockMe.id] },
      }
    );

    expect(result).toEqual({ error: ErrorMessages.AuthorBlockedByRecipient });
  });

  it("should create a new shout with an image and reply to it", async () => {
    await replyToShout(
      { recipientHandle, shoutId, message, files },
      mockDependencies
    );

    expect(mockSaveImage).toHaveBeenCalledWith(files[0]);
    expect(mockCreateShout).toHaveBeenCalledWith({
      message,
      imageId,
    });
    expect(mockCreateReply).toHaveBeenCalledWith({
      shoutId,
      replyId: newShoutId,
    });
  });

  it("should create a new shout without an image and reply to it", async () => {
    await replyToShout(
      { recipientHandle, shoutId, message, files: [] },
      mockDependencies
    );

    expect(mockSaveImage).not.toHaveBeenCalled();
    expect(mockCreateShout).toHaveBeenCalledWith({
      message,
      imageId: undefined,
    });
    expect(mockCreateReply).toHaveBeenCalledWith({
      shoutId,
      replyId: newShoutId,
    });
  });
});
