import { Outlet } from "react-router-dom";

export const KioskLayout = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-800 p-40">
      <Outlet />
    </div>
  );
};
