import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A dark soul",
  description: "Shouts by your favorite user",
};

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl w-full mx-auto flex flex-col p-6 gap-6">
      <h1 className="font-bold text-2xl">Your dark soul mate</h1>
      {children}
    </div>
  );
}
