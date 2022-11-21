import { Footer } from "@components";
import { Outlet } from "react-router-dom";

export const ReservationServiceLayout = () => {
  return (
    <div className=" flex min-h-screen w-full min-w-[22rem] flex-col items-center">
      <Outlet />
      <Footer />
    </div>
  );
};
