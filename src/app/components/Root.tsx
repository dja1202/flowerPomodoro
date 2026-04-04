import { Outlet } from "react-router";

export function Root() {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <Outlet />
    </div>
  );
}
