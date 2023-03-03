import { Outlet } from "react-router-dom";
import { SideBar } from "./_sidebar";

export const AdminLayout = () => {
  return (
    <div className="relative flex h-screen w-full bg-white">
      <SideBar />
      <div className="ml-[320px] p-10">
        <Outlet />
      </div>
    </div>
  );
};
