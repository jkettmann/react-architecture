"use client";

import { useGetFeed } from "@/hooks/use-get-feed";
import { ShoutList } from "@/components/shout-list";
import { Image, User } from "@/types";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function Feed() {
  const feed = useGetFeed();
  if (feed.isError) {
    return <div>An error occurred</div>;
  }
  if (!feed.data) {
    return <LoadingSpinner />;
  }
  const users = feed.data.included.filter((u): u is User => u.type === "user");
  const images = feed.data.included.filter(
    (i): i is Image => i.type === "image"
  );
  return <ShoutList shouts={feed.data.data} users={users} images={images} />;
}
