import { describe, it, expect, vitest } from "vitest";

import FeedService from "./service";

const feedApiMock = {
  getFeed: vitest.fn().mockResolvedValue({
    data: [
      {
        id: "shout-1",
        type: "shout",
        createdAt: 1717045146970,
        attributes: {
          authorId: "user-1",
          text: "The world sucks!!!!",
          likes: 5,
          reshouts: 0,
        },
        relationships: {
          replies: ["shout-2"],
        },
      },
      {
        id: "shout-2",
        type: "shout",
        createdAt: 1717038768844,
        attributes: {
          authorId: "user-3",
          text: "The world sucks!!!!",
          likes: 1000,
          reshouts: 666,
        },
        relationships: {
          replies: [],
        },
      },
    ],
    included: [
      {
        id: "user-1",
        type: "user",
        attributes: {
          handle: "darklord",
          avatar: "/cdn/avatars/darklord.jpeg",
          info: "I am the dark lord, the root of all evil. 'Tis I who brought the world to its knees. In blood I was born, and in blood I shall have my vengeance.",
          numShoutsPastDay: 3,
          blockedUserIds: ["user-2"],
          followsUserIds: ["user-3"],
        },
        relationships: {
          followerIds: ["user-3"],
          me: {
            attributes: {
              isBlocked: true,
              isFollowing: false,
            },
          },
        },
      },
      {
        id: "user-2",
        type: "user",
        attributes: {
          handle: "prettypinkpony",
          avatar: "/cdn/avatars/prettypinkpony.jpeg",
          info: "I like colors. I'm a colorful person (although I'm pretty white *giggles*). I'd like to make this world a better place. And sometimes I feel like the only one who can...",
          numShoutsPastDay: 2,
          blockedUserIds: ["user-1"],
          followsUserIds: ["user-3"],
        },
        relationships: {
          followerIds: ["user-3"],
          me: {
            attributes: {
              isBlocked: false,
              isFollowing: false,
            },
          },
        },
      },
      {
        id: "user-3",
        type: "user",
        attributes: {
          handle: "fcku",
          avatar: "/cdn/avatars/fcku.jpeg",
          numShoutsPastDay: 1,
          blockedUserIds: [],
          followsUserIds: ["user-1", "user-2"],
        },
        relationships: {
          followerIds: ["user-1", "user-2"],
          me: {
            attributes: {
              isBlocked: false,
              isFollowing: true,
            },
          },
        },
      },
      {
        id: "image-1",
        type: "image",
        attributes: {
          url: "https://media.giphy.com/media/dG7ZiL6ImLyNO/giphy.gif",
        },
      },
    ],
  }),
};

describe("FeedService", () => {
  it("should return shouts, users, and images from the feed", async () => {
    const result = await FeedService.getFeed(feedApiMock);

    expect(feedApiMock.getFeed).toHaveBeenCalled();
    expect(result.shouts).toEqual([
      {
        authorId: "user-1",
        createdAt: 1717045146970,
        id: "shout-1",
        imageId: undefined,
        likes: 5,
        replies: ["shout-2"],
        reshouts: 0,
        text: "The world sucks!!!!",
      },
      {
        authorId: "user-3",
        createdAt: 1717038768844,
        id: "shout-2",
        imageId: undefined,
        likes: 1000,
        replies: [],
        reshouts: 666,
        text: "The world sucks!!!!",
      },
    ]);
    expect(result.users).toEqual([
      {
        avatar: "/cdn/avatars/darklord.jpeg",
        followerIds: ["user-3"],
        handle: "darklord",
        id: "user-1",
        info: "I am the dark lord, the root of all evil. 'Tis I who brought the world to its knees. In blood I was born, and in blood I shall have my vengeance.",
        blockedUserIds: ["user-2"],
      },
      {
        avatar: "/cdn/avatars/prettypinkpony.jpeg",
        followerIds: ["user-3"],
        handle: "prettypinkpony",
        id: "user-2",
        info: "I like colors. I'm a colorful person (although I'm pretty white *giggles*). I'd like to make this world a better place. And sometimes I feel like the only one who can...",
        blockedUserIds: ["user-1"],
      },
      {
        avatar: "/cdn/avatars/fcku.jpeg",
        followerIds: ["user-1", "user-2"],
        handle: "fcku",
        id: "user-3",
        info: undefined,
        blockedUserIds: [],
      },
    ]);
    expect(result.images).toEqual([
      {
        id: "image-1",
        url: "https://media.giphy.com/media/dG7ZiL6ImLyNO/giphy.gif",
      },
    ]);
  });
});
