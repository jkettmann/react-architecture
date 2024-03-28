import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiClient } from "@/api/client";
import { LoginDialog } from "@/components/login-dialog";
import { Button } from "@/components/ui/button";
import { Me } from "@/types";

export function Header() {
  const [isLoadingMe, setIsLoadingMe] = useState(true);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [me, setMe] = useState<Me>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    apiClient
      .get<{ data: Me }>("/me")
      .then((response) => setMe(response.data.data))
      .catch(() => setHasError(true))
      .finally(() => setIsLoadingMe(false));
  }, []);

  async function logout() {
    setIsLoadingLogout(true);
    await apiClient.post("/logout");
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
      <Link
        className="flex items-center gap-2"
        to={`/user/${me.attributes.handle}`}
      >
        <img
          className="w-8 h-8 rounded-full"
          src={me.attributes.avatar}
          alt={me.attributes.handle}
        />
        <span className="font-semibold">{`@${me.attributes.handle}`}</span>
      </Link>
      <Button size="sm" onClick={logout} disabled={isLoadingLogout}>
        Logout
      </Button>
    </div>
  );
}
