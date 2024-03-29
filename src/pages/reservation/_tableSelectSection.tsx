import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

import {
  reservationProjectRoomState,
  reservationTableState,
  useReservationDateState,
  useReservationListState,
  useReservationTimeState,
} from "@/stores/reservation";
import {
  isBefore,
  isSameOrAfter,
  isSameOrBefore,
  roundUp30MinuteIncrements,
} from "@utils";

import { ProjectTable } from "@types";
import { BsQuestionCircle } from "react-icons/bs";
import { useModal } from "@/hooks/useModal";

export const TableSelectSection = () => {
  const [reservationTableId, setReservationTableId] = useRecoilState(
    reservationTableState,
  );
  const resetResetvationTable = useResetRecoilState(reservationTableState);

  const [statusItems, setStatusItems] = useState<
    Map<ProjectTable, TableStatusItemType[]>
  >(new Map());
  const reservationProjectroom = useRecoilValue(reservationProjectRoomState);
  const { startTime, endTime } = useReservationTimeState();
  const { reservationDate, firstDateTime, lastDateTime } =
    useReservationDateState();

  const { reservationList, isLoading: isReservationListLoading } =
    useReservationListState();

  const { openModal } = useModal("modal-seating-plan");

  const onClickTable = (tableId: number) => {
    setReservationTableId(tableId);
  };

  const generateTableStatusItems = () => {
    const result = new Map<ProjectTable, TableStatusItemType[]>();

    reservationProjectroom?.projectTableList.forEach((table) => {
      result.set(table, []);

      const tableReservationList = reservationList.filter(
        (reservaion) => reservaion.projectTableId === table.tableId,
      );

      const isReserved = (time: Date) => {
        return tableReservationList.some(
          (v) =>
            isSameOrBefore(v.startAt, time) &&
            isSameOrAfter(v.endAt, dayjs(time).add(30, "minute").toDate()),
        );
      };

      const isSelected = (time: Date) => {
        if (!startTime || !endTime) return false;
        return (
          isSameOrBefore(startTime, time) &&
          isSameOrAfter(endTime, dayjs(time).add(30, "minute").toDate())
        );
      };

      const isOverlapped = (time: Date) => {
        return isReserved(time) && isSelected(time);
      };

      const tableStatusItems = result.get(table);

      for (let i = 0; i < 48; i++) {
        const time = dayjs(firstDateTime)
          .add(30 * i, "minute")
          .toDate();

        if (isOverlapped(time)) {
          tableStatusItems?.push({ date: time, status: "overlapped" });
        } else if (
          isReserved(time) ||
          isBefore(time, roundUp30MinuteIncrements(new Date()))
        ) {
          tableStatusItems?.push({ date: time, status: "disabled" });
        } else if (isSelected(time)) {
          tableStatusItems?.push({ date: time, status: "selected" });
        } else {
          tableStatusItems?.push({ date: time, status: "available" });
        }
      }
    });

    return result;
  };

  useEffect(() => {
    const newItems = generateTableStatusItems();
    setStatusItems(newItems);
    resetResetvationTable();
  }, [reservationDate, reservationProjectroom, startTime, endTime]);

  return (
    <section className="flex flex-col items-center gap-4 px-4 py-8">
      <div className="relative flex flex-col items-center gap-1 text-gray-600">
        <h2 className="text-3xl font-bold text-base-content">테이블 선택</h2>
        <button
          onClick={openModal}
          className="link-hover flex items-center gap-1 text-gray-500 hover:text-primary"
        >
          <span>테이블 배치도</span>
          <BsQuestionCircle />
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 whitespace-nowrap p-4 ">
        <div className="flex items-center gap-4">
          <div className=" badge  border-none bg-base-200 text-base-content">
            예약 가능
          </div>
          <div className=" badge-secondary badge">예약 불가</div>
        </div>
        <div className="flex items-center gap-4">
          <div className=" badge-primary badge">선택 시간</div>
          <div className=" badge-warning badge">겹치는 시간</div>
        </div>
      </div>
      <div className="flex  w-full max-w-7xl flex-col">
        {isReservationListLoading ? (
          <TableSkeleton />
        ) : (
          reservationProjectroom?.projectTableList.map((table) => (
            <button
              key={table.tableId}
              disabled={statusItems
                .get(table)
                ?.some((v) => v.status === "overlapped")}
              onClick={() => onClickTable(table.tableId)}
              className="disabled:cursor-not-allowed"
            >
              <TableStatus
                key={table.tableId}
                table={table}
                items={statusItems.get(table)!}
                disabled={statusItems
                  .get(table)
                  ?.some((v) => v.status === "overlapped")}
                selected={reservationTableId === table.tableId}
              />
            </button>
          ))
        )}
      </div>
    </section>
  );
};

type TableStatusItemType = {
  date: Date;
  status: "available" | "disabled" | "selected" | "overlapped";
};

type TableStatusProps = {
  table: ProjectTable;
  items: TableStatusItemType[];
  selected?: boolean;
  disabled?: boolean;
};

//막대기
const TableStatus = ({
  table,
  items,
  selected,
  disabled,
}: TableStatusProps) => {
  return (
    <div
      className={twMerge([
        "flex  w-full items-center rounded-xl p-4",
        selected && " bg-info text-base-100",
        disabled && "opacity-30",
      ])}
    >
      <div className={twMerge(["w-12 text-center text-2xl font-bold"])}>
        <span>{table.tableName}</span>
      </div>
      <div className="flex w-full flex-col gap-2 px-2 pt-2">
        <div className="flex h-8 w-full overflow-hidden rounded-2xl bg-gray-200">
          {items?.map((item, i) => (
            <div
              key={i}
              className={twMerge([
                "h-full w-full",
                item.status === "disabled" && "bg-secondary",
                item.status === "selected" && "bg-primary",
                item.status === "overlapped" && "bg-warning",
              ])}
            ></div>
          ))}
        </div>
        <div className="relative flex w-full text-left text-[0.5rem] sm:text-base">
          <span className="w-[calc(1/6*100%)]">8</span>
          <span className="relative  w-[calc(1/4*100%)] pl-2 before:absolute  before:top-[-0.5rem] before:left-0 before:content-['│']">
            12
          </span>
          <span className="relative  w-[calc(1/4*100%)] pl-2 before:absolute  before:top-[-0.5rem] before:left-0 before:content-['│']">
            18
          </span>
          <span className="relative  w-[calc(1/4*100%)] pl-2 before:absolute  before:top-[-0.5rem] before:left-0 before:content-['│']">
            0
          </span>
          <span className="absolute right-0">8</span>
        </div>
      </div>
    </div>
  );
};

const TableSkeleton = () => {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6].map((t) => (
        <div
          key={t}
          className={twMerge([
            "flex h-[104px] w-full items-center rounded-xl p-4",
          ])}
        >
          <div className="h-10 w-12 rounded-2xl bg-gray-200 text-opacity-0"></div>
          <div className="flex w-full flex-col gap-2 px-2 pt-2">
            <div className="flex h-8 w-full overflow-hidden rounded-2xl bg-gray-200"></div>
            <div className="relative flex w-full text-left text-[0.5rem] sm:text-base">
              <span className="w-[calc(1/6*100%)]">8</span>
              <span className="relative  w-[calc(1/4*100%)] pl-2 before:absolute  before:top-[-0.5rem] before:left-0 before:content-['│']">
                12
              </span>
              <span className="relative  w-[calc(1/4*100%)] pl-2 before:absolute  before:top-[-0.5rem] before:left-0 before:content-['│']">
                18
              </span>
              <span className="relative  w-[calc(1/4*100%)] pl-2 before:absolute  before:top-[-0.5rem] before:left-0 before:content-['│']">
                0
              </span>
              <span className="absolute right-0">8</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
