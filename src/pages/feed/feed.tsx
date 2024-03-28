import axios from "axios";
import { useEffect, useState } from "react";

import { LoadingSpinner } from "@/components/loading-spinner";
import { ShoutList } from "@/components/shout-list";
import { Image, Shout, User } from "@/types";

type FeedResponse = {
  data: Shout[];
  included: (User | Image)[];
};

export function Feed() {
  const [feed, setFeed] = useState<FeedResponse>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axios
      .get<FeedResponse>("/api/feed")
      .then((response) => {
        setFeed(response.data);
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  if (hasError) {
    return <div>An error occurred</div>;
  }
  if (!feed) {
    return (
      <div className="flex flex-col justify-center items-center mt-24">
        <div className="text-3xl font-bold">SHOUT!</div>
        <div className="mt-1 text-md font-semibold">
          The aggressive social network
        </div>
        <LoadingSpinner className="mt-4" />
      </div>
    );
  }
  const users = feed.included.filter((u): u is User => u.type === "user");
  const images = feed.included.filter((i): i is Image => i.type === "image");
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-center p-6 gap-6">
      <ShoutList shouts={feed.data} users={users} images={images} />
    </div>
  );
}
