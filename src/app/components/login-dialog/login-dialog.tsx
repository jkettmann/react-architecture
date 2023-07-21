import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/use-login";

interface LoginFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface LoginForm extends HTMLFormElement {
  readonly elements: LoginFormElements;
}

type LoginDialogProps = { children: React.ReactNode };

export function LoginDialog({ children }: LoginDialogProps) {
  const login = useLogin();

  function handleSubmit(event: React.FormEvent<LoginForm>) {
    event.preventDefault();
    const username = event.currentTarget.elements.username.value;
    const password = event.currentTarget.elements.password.value;
    login.mutate({ username, password });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>You&apos;re not welcome!</DialogTitle>
          <DialogDescription>
            But click the login button anyway. The credentials are already
            pre-filled.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Label className="space-y-2">
              <span>Username</span>
              <Input
                className="col-span-3"
                name="username"
                placeholder="Username"
                defaultValue="prettypinkpony"
              />
            </Label>
            <Label className="space-y-2">
              <span>Password</span>
              <Input
                className="col-span-3"
                name="password"
                placeholder="Password"
                defaultValue="12345678"
                type="password"
              />
            </Label>
          </div>
          <DialogFooter>
            <Button className="w-full" type="submit" disabled={login.isLoading}>
              Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
