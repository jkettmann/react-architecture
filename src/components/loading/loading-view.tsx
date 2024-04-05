import { LoadingSpinner } from "./loading-spinner";

export function LoadingView() {
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
