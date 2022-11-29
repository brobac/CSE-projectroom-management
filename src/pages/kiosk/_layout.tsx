import { Outlet } from "react-router-dom";

export const KioskLayout = () => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gray-800 p-10">
      <Outlet />
    </div>
  );
};
