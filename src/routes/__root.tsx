import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { WebcamIcon } from "@/components/icons";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export const Route = createRootRoute({
  component: () => (
    <div className="overflow-y-clip">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center">
          <WebcamIcon className="h-6 w-6" />
          <span className="sr-only">Messaging App</span>
        </Link>
        <div className="flex items-center gap-4">
          <SignedOut>
            <Button>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <hr />
      <Outlet />
      <Toaster position="top-right" />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
