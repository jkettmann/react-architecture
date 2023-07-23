"use client";

import Image from "next/image";
import { useGetMe } from "@/hooks/use-get-me";
import { LoginDialog } from "@/components/login-dialog";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-logout";

export function Header() {
  const me = useGetMe();
  const logout = useLogout();

  if (me.isError || !me.data?.data) {
    return (
      <div className="w-full flex justify-between items-center p-2">
        <h1 className="font-semibold">
          The world is a dark place! Let&apos;s make it darker
        </h1>
        <LoginDialog>
          <Button size="sm" disabled={logout.isLoading || me.isFetching}>
            Login
          </Button>
        </LoginDialog>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-between p-2">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          src={me.data.data.attributes.avatar}
          alt={me.data.data.attributes.handle}
          width={36}
          height={36}
        />
        <span className="font-semibold">{`@${me.data.data.attributes.handle}`}</span>
      </div>
      <Button
        size="sm"
        onClick={() => logout.mutate()}
        disabled={logout.isLoading || me.isFetching}
      >
        Logout
      </Button>
    </div>
  );
}
