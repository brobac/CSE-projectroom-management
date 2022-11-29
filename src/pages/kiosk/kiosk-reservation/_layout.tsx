import { Outlet } from "react-router-dom";
import { KioskHeader } from "../_header";

export const KioskReservationLayout = () => {
  return (
    <>
      <KioskHeader />
      <div className="h-full w-full pt-24">
        <Outlet />
      </div>
    </>
  );
};
