import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import NavBar from "../components/navBar";

export const Route = createRootRoute({
  component: () => (
    <div className="relative z-0">
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
