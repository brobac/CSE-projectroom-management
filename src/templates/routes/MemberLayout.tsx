import { useUserState } from "@/stores/user";
import { Navigate, Outlet } from "react-router-dom";

export const Memberlayout = () => {
  const { user } = useUserState();

  const isMember = user?.roleType === "ROLE_MEMBER";

  return isMember ? <Outlet /> : <Navigate to="/" />;
};
