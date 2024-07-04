import { useGetFeed } from "@/application/queries/use-get-feed";
import { LoadingView } from "@/components/loading";
import { ShoutList } from "@/components/shout-list";

export function Feed() {
  const feed = useGetFeed();

  if (feed.isError) {
    return <div>An error occurred</div>;
  }

  if (!feed.data) {
    return <LoadingView />;
  }
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-center p-6 gap-6">
      <ShoutList
        shouts={feed.data.shouts}
        users={feed.data.users}
        images={feed.data.images}
      />
    </div>
  );
}
