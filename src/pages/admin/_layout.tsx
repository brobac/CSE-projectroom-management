import { useUserState } from "@stores";
import { Navigate, Outlet } from "react-router-dom";
import { SideBar } from "./_sidebar";

export const AdminLayout = () => {
  const { user } = useUserState();

  const isAdmin = user?.roleType === "ROLE_ADMIN";
  console.log(isAdmin);
  console.log(user?.roleType);
  return isAdmin ? (
    <div className="relative flex h-screen w-full bg-white">
      <SideBar />
      <div className="ml-64 w-full p-10">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/admin/login" />
  );
};
