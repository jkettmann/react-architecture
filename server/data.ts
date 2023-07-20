import { DbFeedResponse, DbImage, DbShout, DbUser } from "./types";

export const users: DbUser[] = [
  {
    id: "user-1",
    type: "user",
    attributes: {
      handle: "darklord",
      avatar: "https://avatars.githubusercontent.com/u/4726921?v=4",
    },
  },
  {
    id: "user-2",
    type: "user",
    attributes: {
      handle: "prettypinkpony",
      avatar: "https://avatars.githubusercontent.com/u/4726921?v=4",
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
      replies: 2,
      likes: 1000,
      reshouts: 666,
    },
  },
  {
    id: "shout-2",
    type: "shout",
    createdAt: Date.now() - 6378126,
    attributes: {
      authorId: "user-1",
      text: "The world sucks!!!!",
      replies: 30,
      likes: 1000,
      reshouts: 666,
    },
  },
  {
    id: "shout-3",
    type: "shout",
    createdAt: Date.now() - 8903417,
    attributes: {
      authorId: "user-2",
      text: "You suck @darklord!!!!",
      replies: 100,
      likes: 1000,
      reshouts: 666,
    },
  },
  {
    id: "shout-4",
    type: "shout",
    createdAt: Date.now() - 9338944,
    attributes: {
      authorId: "user-1",
      text: "The world sucks!!!!",
      replies: 2,
      likes: 1000,
      reshouts: 666,
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
