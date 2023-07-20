import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shout Feed",
  description: "Your shout feed",
};

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-center p-6 gap-6">
      <h1 className="font-bold text-2xl text-center">
        The world is a dark place! Let&apos;s make it darker
      </h1>
      {children}
    </div>
  );
}
