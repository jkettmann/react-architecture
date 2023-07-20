"use client";

import { useGetFeed } from "@/hooks/useGetFeed";
import { ShoutList } from "@/components/shout-list";
import { Image, User } from "@/types";

export default function Feed() {
  const feed = useGetFeed();
  if (feed.isLoading || !feed.data) {
    return <div>Loading...</div>;
  }
  if (feed.isError) {
    return <div>An error occurred</div>;
  }
  const users = feed.data.included.filter((u): u is User => u.type === "user");
  const images = feed.data.included.filter(
    (i): i is Image => i.type === "image"
  );
  return <ShoutList shouts={feed.data.data} users={users} images={images} />;
}
