import { useState } from "react";

import { useLogin } from "@/application/mutations/use-login";
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

interface LoginFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface LoginForm extends HTMLFormElement {
  readonly elements: LoginFormElements;
}

interface LoginDialogProps {
  children: React.ReactNode;
}

export function LoginDialog({ children }: LoginDialogProps) {
  const [open, setOpen] = useState(false);
  const login = useLogin();

  async function handleSubmit(event: React.FormEvent<LoginForm>) {
    event.preventDefault();
    const username = event.currentTarget.elements.username.value;
    const password = event.currentTarget.elements.password.value;

    await login.mutateAsync({ username, password });

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                required
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
                required
              />
            </Label>
          </div>
          <DialogFooter>
            <Button className="w-full" type="submit" disabled={login.isPending}>
              Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
