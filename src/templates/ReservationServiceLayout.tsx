import { Footer } from "@components";
import { Outlet } from "react-router-dom";

export const ReservationServiceLayout = () => {
  return (
    <div className=" flex min-h-screen w-screen flex-col items-center">
      <Outlet />
      <Footer />
    </div>
  );
};
