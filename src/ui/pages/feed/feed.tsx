import { useGetFeed } from "@/application/feed/use-get-feed";
import { ShoutList } from "@/ui/components/shout-list";
import { LoadingSpinner } from "@/ui/components/loading-spinner";

export function Feed() {
  const feed = useGetFeed();
  if (feed.isError) {
    return <div>An error occurred</div>;
  }
  if (!feed.data) {
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
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-center p-6 gap-6">
      <ShoutList shouts={feed.data} />
    </div>
  );
}
