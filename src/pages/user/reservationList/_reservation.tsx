import { PastResetvation } from "@types";
import { toHHMM, toYYYYMD_KO_DAY_DOT } from "@utils";
import { twMerge } from "tailwind-merge";

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
    case "반납 완료":
      return "text-primary";
    default:
      return "text-base-content";
  }
};

export const Reservation = ({
  startDateTime,
  endDateTime,
  roomName,
  tableName,
  reservationStatus,
}: PastResetvation) => {
  return (
    <div className="rounded-box w-full border border-base-300 bg-base-100 text-sm sm:text-base">
      <div className="divide-x-1 flex w-full divide-x-[1px] divide-base-300">
        <div className="flex flex-col items-center p-4">
          <span>{toYYYYMD_KO_DAY_DOT(startDateTime)}</span>
          <span className="font-bold">
            {`${toHHMM(startDateTime)} ~ ${toHHMM(endDateTime)}`}
          </span>
        </div>
        <div className="flex grow items-center justify-between gap-4">
          <div className="flex flex-col items-center py-4 pl-4">
            <span>{roomName}</span>
            <span className="font-bold">{tableName}테이블</span>
          </div>
          <div
            className={twMerge([
              "pr-4 font-bold",
              getStatusColor(reservationStatus.status),
            ])}
          >
            {reservationStatus.status}
          </div>
        </div>
      </div>
    </div>
  );
};
