import { describe, it, expect, vitest } from "vitest";

import UserService from "./service";

const userApiMock = {
  getMe: vitest.fn(),
  getUser: vitest.fn(),
  getUserShouts: vitest.fn().mockResolvedValue({
    data: [
      {
        id: "shout-5",
        type: "shout",
        createdAt: 1717046170490,
        attributes: {
          authorId: "user-2",
          text: "Test message",
          likes: 0,
          reshouts: 0,
          imageId: "image-2",
        },
        relationships: {
          replies: [],
          replyTo: "shout-1",
        },
      },
      {
        id: "shout-3",
        type: "shout",
        createdAt: 1717036243553,
        attributes: {
          authorId: "user-2",
          text: "You suck @darklord!!!!",
          likes: 1000,
          reshouts: 666,
        },
        relationships: {
          replies: ["shout-4"],
        },
      },
    ],
    included: [
      {
        id: "image-1",
        type: "image",
        attributes: {
          url: "/cdn/shouts/cute.gif",
        },
      },
    ],
  }),
};

describe("UserService", () => {
  it("should return shouts, users, and images from the feed", async () => {
    const result = await UserService.getUserShouts("fcku", userApiMock);

    expect(userApiMock.getUserShouts).toHaveBeenCalledWith("fcku");
    expect(result?.shouts).toEqual([
      {
        authorId: "user-2",
        createdAt: 1717046170490,
        id: "shout-5",
        imageId: "image-2",
        likes: 0,
        replies: [],
        reshouts: 0,
        text: "Test message",
      },
      {
        authorId: "user-2",
        createdAt: 1717036243553,
        id: "shout-3",
        imageId: undefined,
        likes: 1000,
        replies: ["shout-4"],
        reshouts: 666,
        text: "You suck @darklord!!!!",
      },
    ]);
    expect(result?.images).toEqual([
      {
        id: "image-1",
        url: "/cdn/shouts/cute.gif",
      },
    ]);
  });
});
