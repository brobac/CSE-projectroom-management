import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

import {
  reservationProjectroomState,
  ROOM_NAME_LIST,
  TABLE_INFO,
  useReservationDateState,
  useReservationTimeState,
} from "@/stores/reservation";
import {
  isBefore,
  isSameOrAfter,
  isSameOrBefore,
  roundUp30MinuteIncrements,
} from "@utils";

import { TEMP_RESERVATION_LIST } from "./_tempData";

export const TableSelectSection = () => {
  const [selectedTable, setSelectedTable] = useState("");
  const [statusItems, setStatusItems] = useState<
    Map<string, TableStatusItemType[]>
  >(new Map());
  const { startTime, endTime } = useReservationTimeState();
  const { reservationDate, firstTime, lastTime } = useReservationDateState();
  const reservationProjectroom = useRecoilValue(reservationProjectroomState);

  const onChangeTable = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTable(e.target.value);
  };

  const generateTableStatusItems = () => {
    const projectroomReservationList = TEMP_RESERVATION_LIST.filter(
      (v) => v.room === reservationProjectroom,
    );
    const result = new Map();

    for (let i = 0; i < TABLE_INFO[reservationProjectroom].length; i++) {
      const tableName = TABLE_INFO[reservationProjectroom][i];
      result.set(tableName, []);
      const tableReservationList = projectroomReservationList.filter(
        (v) => v.table === tableName,
      );

      const isReserved = (time: Date) => {
        return tableReservationList.some(
          (v) =>
            isSameOrBefore(v.startDateTime, time) &&
            isSameOrAfter(
              v.endDateTime,
              dayjs(time).add(30, "minute").toDate(),
            ),
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

      for (let i = 0; i < 48; i++) {
        const time = dayjs(firstTime)
          .add(30 * i, "minute")
          .toDate();

        if (isOverlapped(time)) {
          result.get(tableName).push({ date: time, status: "overlapped" });
        } else if (
          isReserved(time) ||
          isBefore(time, roundUp30MinuteIncrements(new Date()))
        ) {
          result.get(tableName).push({ date: time, status: "disabled" });
        } else if (isSelected(time)) {
          result.get(tableName).push({ date: time, status: "selected" });
        } else {
          result.get(tableName).push({ date: time, status: "available" });
        }
      }
    }
    return result;
  };

  useEffect(() => {
    const newItems = generateTableStatusItems();
    setStatusItems(newItems);
    setSelectedTable("");
  }, [reservationDate, reservationProjectroom, startTime, endTime]);

  return (
    <section className="flex flex-col items-center gap-4 px-4 py-8">
      <h2 className="text-3xl font-bold text-base-content">테이블 선택</h2>
      <div className="flex gap-4 whitespace-nowrap p-4 ">
        <div className=" badge  border-none bg-base-200 text-base-content">
          예약 가능
        </div>
        <div className=" badge-secondary badge">예약 불가</div>
        <div className=" badge-primary badge">선택 시간</div>
        <div className=" badge-warning badge">겹치는 시간</div>
      </div>
      <div className="flex  w-full max-w-7xl flex-col">
        {TABLE_INFO[reservationProjectroom].map((table) => (
          <label className=" cursor-pointer">
            <input
              type="radio"
              name="table"
              className="hidden"
              value={table}
              onChange={onChangeTable}
              disabled={statusItems
                .get(table)
                ?.some((v) => v.status === "overlapped")}
            />
            <TableStatus
              key={table}
              table={table}
              items={statusItems.get(table)!}
              disabled={statusItems
                .get(table)
                ?.some((v) => v.status === "overlapped")}
              selected={selectedTable === table}
            />
          </label>
        ))}
      </div>
    </section>
  );
};

type ProjectRoomType = typeof ROOM_NAME_LIST[number];

type TableStatusItemType = {
  date: Date;
  status: "available" | "disabled" | "selected" | "overlapped";
};

type TableStatusProps = {
  table: typeof TABLE_INFO[ProjectRoomType][number];
  items: TableStatusItemType[];
  selected?: boolean;
  disabled?: boolean;
};

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
        selected && "bg-info text-base-100",
        disabled && "opacity-30",
      ])}
    >
      <div className={twMerge(["w-10 text-center text-2xl font-bold"])}>
        <span>{table}</span>
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
        <div className="relative flex w-full text-[0.5rem] sm:text-base">
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
