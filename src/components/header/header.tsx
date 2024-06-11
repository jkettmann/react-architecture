import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { LoginDialog } from "@/components/login-dialog";
import { Button } from "@/components/ui/button";
import { Me } from "@/domain/me";
import AuthService from "@/infrastructure/auth";
import UserService from "@/infrastructure/user";

export function Header() {
  const [isLoadingMe, setIsLoadingMe] = useState(true);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [me, setMe] = useState<Me>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    UserService.getMe()
      .then((me) => setMe(me))
      .catch(() => setHasError(true))
      .finally(() => setIsLoadingMe(false));
  }, []);

  async function logout() {
    setIsLoadingLogout(true);
    await AuthService.logout();
    setIsLoadingLogout(false);
    window.location.reload();
  }

  if (hasError || !me) {
    return (
      <div className="w-full flex justify-end items-center p-2">
        <LoginDialog>
          <Button size="sm" disabled={isLoadingMe}>
            Login
          </Button>
        </LoginDialog>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-between p-2">
      <Link className="flex items-center gap-2" to={`/user/${me.handle}`}>
        <img className="w-8 h-8 rounded-full" src={me.avatar} alt={me.handle} />
        <span className="font-semibold">{`@${me.handle}`}</span>
      </Link>
      <Button size="sm" onClick={logout} disabled={isLoadingLogout}>
        Logout
      </Button>
    </div>
  );
}
