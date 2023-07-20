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
  return <div className="flex flex-col p-6 gap-6">{children}</div>;
}
