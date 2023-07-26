import { useGetMe } from "@/ui/hooks/use-get-me";
import { LoginDialog } from "@/ui/components/login-dialog";
import { Button } from "@/ui/components/ui/button";
import { useLogout } from "@/ui/hooks/use-logout";

export function Header() {
  const me = useGetMe();
  const logout = useLogout();

  if (me.isError || !me.data) {
    return (
      <div className="w-full flex justify-end items-center p-2">
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
        <img
          className="w-8 h-8 rounded-full"
          src={me.data.avatar}
          alt={me.data.handle}
        />
        <span className="font-semibold">{`@${me.data.handle}`}</span>
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
