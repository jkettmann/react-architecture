import * as React from "react";
import { FeedResponse, Image, Shout as ISHout, User } from "@/types";
import { Shout } from "@/components/shout/shout";

const users: User[] = [
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

const defaultAuthor: User = {
  id: "invalid",
  type: "user",
  attributes: {
    handle: "Deleted",
    avatar:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptOSAxMmMwIDEuOTQtLjYyNCAzLjczNS0xLjY3MiA1LjIwN2wtMTIuNTM1LTEyLjUzNWMxLjQ3Mi0xLjA0OCAzLjI2Ny0xLjY3MiA1LjIwNy0xLjY3MiA0Ljk2MiAwIDkgNC4wMzggOSA5em0tMTggMGMwLTEuOTQuNjI0LTMuNzM1IDEuNjcyLTUuMjA3bDEyLjUzNCAxMi41MzRjLTEuNDcxIDEuMDQ5LTMuMjY2IDEuNjczLTUuMjA2IDEuNjczLTQuOTYyIDAtOS00LjAzOC05LTl6Ii8+PC9zdmc+",
  },
};

const shouts: ISHout[] = [
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

const images: Image[] = [
  {
    id: "image-1",
    type: "image",
    attributes: {
      url: "https://media.giphy.com/media/dG7ZiL6ImLyNO/giphy.gif",
    },
  },
];

const feedResponse: FeedResponse = {
  data: shouts,
  included: [...users, ...images],
};

export default function Feed() {
  return (
    <div className="flex flex-col p-6 gap-6">
      {feedResponse.data.map((shout) => {
        const author = feedResponse.included.find(
          (item): item is User =>
            item.type === "user" && item.id === shout.attributes.authorId
        );
        return (
          <Shout
            key={shout.id}
            shout={shout}
            author={author ?? defaultAuthor}
          />
        );
      })}
    </div>
  );
}
