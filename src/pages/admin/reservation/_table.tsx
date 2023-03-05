import { useModal } from "@/hooks/useModal";
import { useFetchAdminReservationList } from "@/services/react-query/admin/reservation";
import { adminSelectedReservationState } from "@/stores/admin/reservation";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AdminReservationDTO } from "@types";
import { toYYMMDD_KO_DAY_DOT_hhmm } from "@utils";
import { useSetRecoilState } from "recoil";

const columnHelper = createColumnHelper<AdminReservationDTO>();

const columns = [
  columnHelper.accessor("reservation.roomName", { header: "프로젝트실" }),
  columnHelper.accessor("reservation.tableName", { header: "테이블" }),
  columnHelper.accessor("reservation.startAt", {
    header: "시작시간",
    cell: (v) => toYYMMDD_KO_DAY_DOT_hhmm(v.getValue()),
  }),
  columnHelper.accessor("reservation.endAt", {
    header: "종료시간",
    cell: (v) => toYYMMDD_KO_DAY_DOT_hhmm(v.getValue()),
  }),
  columnHelper.accessor("tableReturn.returnAt", {
    header: "반납시간",
    cell: (v) =>
      v.getValue() ? toYYMMDD_KO_DAY_DOT_hhmm(v.getValue()) : "-- : --",
  }),
  columnHelper.accessor("member.name", { header: "예약자" }),
  columnHelper.accessor("reservation.reservationStatus.status", {
    header: "상태",
  }),
];

export const AdminReservationTable = () => {
  const { openModal } = useModal("modal-admin-reservation");
  const setSelectedRow = useSetRecoilState(adminSelectedReservationState);
  const { data, isLoading } = useFetchAdminReservationList();
  const table = useReactTable({
    data: data?.content ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onClickRow = (reservation: AdminReservationDTO) => {
    setSelectedRow(reservation);
    openModal();
  };

  return isLoading ? (
    <div>로딩중</div>
  ) : (
    <table className="w-full">
      <thead className="w-full border-b border-b-base-200">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="py-2">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="w-full divide-y divide-base-200">
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            onClick={() => onClickRow(row.original)}
            className="cursor-pointer transition-colors hover:bg-gray-100"
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-3 text-center">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
