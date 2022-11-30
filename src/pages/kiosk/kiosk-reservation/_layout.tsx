import { Outlet } from "react-router-dom";
import { KioskHeader } from "../_header";

export const KioskReservationLayout = () => {
  return (
    <>
      <KioskHeader title="D330" />
      <div className="h-full w-full pt-24">
        <Outlet />
      </div>
    </>
  );
};
