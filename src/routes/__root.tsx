import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <hr /> */}
      <Outlet />
      <Toaster position="top-right" />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
