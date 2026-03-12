import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-scne-bg text-white">
      <Outlet />
    </div>
  );
}