import * as React from "react";
import { User } from "@/types";
import { Shout } from "@/components/shout";

const defaultAuthor: User = {
  id: "invalid",
  type: "user",
  attributes: {
    handle: "Deleted",
    avatar:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptOSAxMmMwIDEuOTQtLjYyNCAzLjczNS0xLjY3MiA1LjIwN2wtMTIuNTM1LTEyLjUzNWMxLjQ3Mi0xLjA0OCAzLjI2Ny0xLjY3MiA1LjIwNy0xLjY3MiA0Ljk2MiAwIDkgNC4wMzggOSA5em0tMTggMGMwLTEuOTQuNjI0LTMuNzM1IDEuNjcyLTUuMjA3bDEyLjUzNCAxMi41MzRjLTEuNDcxIDEuMDQ5LTMuMjY2IDEuNjczLTUuMjA2IDEuNjczLTQuOTYyIDAtOS00LjAzOC05LTl6Ii8+PC9zdmc+",
  },
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
