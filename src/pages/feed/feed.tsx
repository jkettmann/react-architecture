import { useEffect, useState } from "react";

import FeedApi from "@/api/feed";
import { LoadingView } from "@/components/loading";
import { ShoutList } from "@/components/shout-list";
import { FeedResponse, Image, User } from "@/types";

export function Feed() {
  const [feed, setFeed] = useState<FeedResponse>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    FeedApi.getFeed()
      .then((feed) => setFeed(feed))
      .catch(() => setHasError(true));
  }, []);

  if (hasError) {
    return <div>An error occurred</div>;
  }

  if (!feed) {
    return <LoadingView />;
  }

  const users = feed.included.filter((u): u is User => u.type === "user");
  const images = feed.included.filter((i): i is Image => i.type === "image");
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-center p-6 gap-6">
      <ShoutList shouts={feed.data} users={users} images={images} />
    </div>
  );
}
