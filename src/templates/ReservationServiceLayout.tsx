import { Outlet } from "react-router-dom";

export const ReservationServiceLayout = () => {
  return (
    <div className=" flex w-screen flex-col">
      <Outlet />
    </div>
  );
};
