import { useUserState } from "@/stores/user";
import { Navigate, Outlet } from "react-router-dom";

export const RestrictedAuthLayout = () => {
  const { hasAuth } = useUserState();
  return hasAuth ? <Navigate to="/" /> : <Outlet />;
};
