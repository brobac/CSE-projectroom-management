import { useModal } from "@/hooks/useModal";
import { useFetchAdminReservationList } from "@/services/react-query/admin/reservation";
import { adminSelectedReservationState } from "@/stores/admin/reservation";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { AdminReservationDTO } from "@types";
import { toYYMMDD_KO_DAY_DOT_hhmm } from "@utils";
import { useEffect, useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";

const getStatusColor = (status: string) => {
  switch (status) {
    case "예약완료":
      return "text-primary";
    case "취소됨":
      return "text-base-300";
    case "사용중":
      return "text-info";
    case "미사용":
      return "text-error";
    case "반납 대기중":
      return "text-warning";
    case "미반납":
      return "text-error";
    case "반납완료":
      return "text-primary";
    default:
      return "text-base-content";
  }
};

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
  columnHelper.accessor("tableReturn.returnedAt", {
    header: "반납시간",
    cell: (v) =>
      v.getValue() ? toYYMMDD_KO_DAY_DOT_hhmm(v.getValue()) : "-- : --",
  }),
  columnHelper.accessor("member.name", { header: "예약자" }),
  columnHelper.accessor("reservation.reservationStatus.status", {
    header: "상태",
    cell: (v) => (
      <span className={getStatusColor(v.getValue())}>{v.getValue()}</span>
    ),
  }),
];

export const AdminReservationTable = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const { openModal } = useModal("modal-admin-reservation");
  const setSelectedRow = useSetRecoilState(adminSelectedReservationState);
  const { data, isLoading } = useFetchAdminReservationList({
    size: pageSize,
    page: pageIndex,
  });

  const table = useReactTable({
    data: data?.content ?? [],
    columns,
    pageCount: data?.totalPages,
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  const onClickRow = (reservation: AdminReservationDTO) => {
    setSelectedRow(reservation);
    openModal();
  };

  useEffect(() => {
    console.log(pageIndex);
  }, [pageIndex]);
  return (
    <>
      {isLoading ? (
        <div className="flex w-full flex-col gap-6">
          {Array(20)
            .fill("")
            .map((v, i) => (
              <div
                key={i}
                className=" h-14 w-full rounded-md bg-gray-100"
              ></div>
            ))}
        </div>
      ) : (
        <table className="w-full">
          <thead className="w-full border-b border-b-base-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="
            [&>th:nth-of-type(1)]:w-[10%]
            [&>th:nth-of-type(2)]:w-[10%]
            [&>th:nth-of-type(3)]:w-[10%]
            [&>th:nth-of-type(4)]:w-[10%]
            [&>th:nth-of-type(5)]:w-[10%]
            [&>th:nth-of-type(6)]:w-[10%]
            [&>th:nth-of-type(7)]:w-[10%]
            "
              >
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
            <>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onClickRow(row.original)}
                  className="cursor-pointer transition-colors hover:bg-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3 text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          </tbody>
        </table>
      )}

      <div className="flex items-center gap-2">
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 rounded border p-1"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
