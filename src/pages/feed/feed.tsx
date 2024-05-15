import { useEffect, useState } from "react";

import { LoadingView } from "@/components/loading";
import { ShoutList } from "@/components/shout-list";
import { Image, Shout, User } from "@/domain";
import FeedService from "@/infrastructure/feed";

export function Feed() {
  const [feed, setFeed] = useState<{
    shouts: Shout[];
    images: Image[];
    users: User[];
  }>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    FeedService.getFeed()
      .then((feed) => setFeed(feed))
      .catch(() => setHasError(true));
  }, []);

  if (hasError) {
    return <div>An error occurred</div>;
  }

  if (!feed) {
    return <LoadingView />;
  }
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-center p-6 gap-6">
      <ShoutList shouts={feed.shouts} users={feed.users} images={feed.images} />
    </div>
  );
}
