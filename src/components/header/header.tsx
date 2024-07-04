import { Link } from "react-router-dom";

import { useLogout } from "@/application/mutations/use-logout";
import { useGetMe } from "@/application/queries/use-get-me";
import { LoginDialog } from "@/components/login-dialog";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/domain/me";

export function Header() {
  const me = useGetMe();
  const logout = useLogout();

  if (me.isError || !isAuthenticated(me.data)) {
    return (
      <div className="w-full flex justify-end items-center p-2">
        <LoginDialog>
          <Button size="sm" disabled={me.isLoading}>
            Login
          </Button>
        </LoginDialog>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-between p-2">
      <Link className="flex items-center gap-2" to={`/user/${me.data.handle}`}>
        <img
          className="w-8 h-8 rounded-full"
          src={me.data.avatar}
          alt={me.data.handle}
        />
        <span className="font-semibold">{`@${me.data.handle}`}</span>
      </Link>
      <Button
        size="sm"
        onClick={() => logout.mutate()}
        disabled={logout.isPending}
      >
        Logout
      </Button>
    </div>
  );
}
