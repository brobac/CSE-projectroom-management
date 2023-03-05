import { AdminReservationTable } from "./_table";

export const AdminReservationPage = () => {
  return (
    <div className="w-full">
      <h2 className="mb-10 text-4xl font-bold">예약 내역 조회</h2>
      <AdminReservationTable />
    </div>
  );
};
