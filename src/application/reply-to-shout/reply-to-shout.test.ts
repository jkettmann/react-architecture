import { beforeEach, describe, expect, it, vitest } from "vitest";

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

const mockGetMe = vitest.fn().mockResolvedValue(mockMe);
const mockGetUser = vitest.fn().mockResolvedValue(mockRecipient);
const mockSaveImage = vitest.fn().mockResolvedValue({ id: imageId });
const mockCreateShout = vitest.fn().mockResolvedValue({ id: newShoutId });
const mockCreateReply = vitest.fn();

const mockDependencies = {
  getMe: mockGetMe,
  getUser: mockGetUser,
  saveImage: mockSaveImage,
  createShout: mockCreateShout,
  createReply: mockCreateReply,
};

describe("replyToShout", () => {
  beforeEach(() => {
    Object.values(mockDependencies).forEach((mock) => mock.mockClear());
  });

  it("should return an error if the user has made too many shouts", async () => {
    mockGetMe.mockResolvedValueOnce({ ...mockMe, numShoutsPastDay: 5 });

    const result = await replyToShout(
      { recipientHandle, shoutId, message, files },
      mockDependencies
    );

    expect(result).toEqual({ error: ErrorMessages.TooManyShouts });
  });

  it("should return an error if the recipient does not exist", async () => {
    mockGetUser.mockResolvedValueOnce(undefined);

    const result = await replyToShout(
      { recipientHandle, shoutId, message, files },
      mockDependencies
    );

    expect(result).toEqual({ error: ErrorMessages.RecipientNotFound });
  });

  it("should return an error if the recipient has blocked the author", async () => {
    mockGetUser.mockResolvedValueOnce({
      ...mockRecipient,
      blockedUserIds: [mockMe.id],
    });

    const result = await replyToShout(
      { recipientHandle, shoutId, message, files },
      mockDependencies
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
