import { useRouter } from "next/router";

type UserProfileProps = {
  params: {
    handle: string;
  };
};

export function UserProfile({ params }: UserProfileProps) {
  return <div />;
}
