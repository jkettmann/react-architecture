import { DbImage, DbShout, DbUser } from "./types";

export const users: DbUser[] = [
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
  },
  {
    id: "user-2",
    type: "user",
    attributes: {
      handle: "prettypinkpony",
      numShoutsPastDay: 4,
      avatar: "/cdn/avatars/prettypinkpony.jpeg",
      info: "I like colors. I'm a colorful person (although I'm pretty white *giggles*). I'd like to make this world a better place. And sometimes I feel like the only one who can...",
      blockedUserIds: ["user-1"],
      followsUserIds: ["user-3"],
    },
  },
  {
    id: "user-3",
    type: "user",
    attributes: {
      handle: "fcku",
      avatar: "/cdn/avatars/fcku.jpeg",
      numShoutsPastDay: 2,
      blockedUserIds: [],
      followsUserIds: ["user-1", "user-2"],
    },
  },
];

export const shouts: DbShout[] = [
  {
    id: "shout-1",
    type: "shout",
    createdAt: Date.now(),
    attributes: {
      authorId: "user-1",
      text: "The world sucks!!!!",
      likes: 5,
      reshouts: 0,
    },
    relationships: {
      replies: ["shout-3"],
    },
  },
  {
    id: "shout-2",
    type: "shout",
    createdAt: Date.now() - 6378126,
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
  {
    id: "shout-3",
    type: "shout",
    createdAt: Date.now() - 8903417,
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
  {
    id: "shout-4",
    type: "shout",
    createdAt: Date.now() - 9338944,
    attributes: {
      authorId: "user-1",
      text: "The world sucks!!!!",
      likes: 1000,
      reshouts: 666,
    },
    relationships: {
      replies: [],
    },
  },
];

export const images: DbImage[] = [
  {
    id: "image-1",
    type: "image",
    attributes: {
      url: "https://media.giphy.com/media/dG7ZiL6ImLyNO/giphy.gif",
    },
  },
];
