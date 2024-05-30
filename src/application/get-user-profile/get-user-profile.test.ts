import { describe, expect, it, vitest } from "vitest";

import { getUserProfile } from "./get-user-profile";

const handle = "user-handle";

const mockGetUser = vitest.fn().mockResolvedValue({
  id: "user-id",
  handle: "user-handle",
  avatar: "user-avatar",
  info: "user-info",
  followerIds: [],
});

const mockGetUserShouts = vitest.fn().mockResolvedValue({
  shouts: [
    {
      id: "shout-id",
      createdAt: 1234567890,
      authorId: "user-id",
      text: "shout-text",
      likes: 0,
      reshouts: 0,
      imageId: "image-id",
      replies: [],
    },
  ],
  images: [
    {
      id: "image-id",
      url: "image-url",
    },
  ],
});

const mockDependencies = {
  getUser: mockGetUser,
  getUserShouts: mockGetUserShouts,
};

describe("getUserProfile", () => {
  it("should create a new shout with an image and reply to it", async () => {
    const result = await getUserProfile({ handle }, mockDependencies);

    expect(mockGetUser).toHaveBeenCalledWith(handle);
    expect(mockGetUserShouts).toHaveBeenCalledWith(handle);

    expect(result).toEqual({
      user: {
        id: "user-id",
        handle: "user-handle",
        avatar: "user-avatar",
        info: "user-info",
        followerIds: [],
      },
      shouts: [
        {
          id: "shout-id",
          createdAt: 1234567890,
          authorId: "user-id",
          text: "shout-text",
          likes: 0,
          reshouts: 0,
          imageId: "image-id",
          replies: [],
        },
      ],
      images: [
        {
          id: "image-id",
          url: "image-url",
        },
      ],
    });
  });
});
