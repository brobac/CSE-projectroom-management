import { ProjectroomNameType } from "@/stores/reservation";
import { DateValue, ReservationStateType } from "@types";
import { toHHMM, toYYYYMD_KO_DAY_DOT } from "@utils";
import { twMerge } from "tailwind-merge";

export type ReservationProps = {
  id: number;
  reservationDate: DateValue;
  startDateTime: DateValue;
  endDateTime: DateValue;
  projectroom: ProjectroomNameType;
  table: string;
  reservationState: ReservationStateType;
};

const STATE_COLOR = {
  예약완료: "text-primary",
  취소됨: "text-base-300",
  사용중: "text-info",
  미사용: "text-error",
  "반납 대기중": "text-warning",
  미반납: "text-error",
  "반납 완료": "text-primary",
};

export const Reservation = ({
  reservationDate,
  startDateTime,
  endDateTime,
  projectroom,
  table,
  reservationState,
}: ReservationProps) => {
  return (
    <div className="rounded-box w-full border border-base-300 bg-base-100 text-sm sm:text-base">
      <div className="divide-x-1 flex w-full divide-x-[1px] divide-base-300">
        <div className="flex flex-col items-center p-4">
          <span>{toYYYYMD_KO_DAY_DOT(reservationDate)}</span>
          <span className="font-bold">
            {`${toHHMM(startDateTime)} ~ ${toHHMM(endDateTime)}`}
          </span>
        </div>
        <div className="flex grow items-center justify-between gap-4">
          <div className="flex flex-col items-center py-4 pl-4">
            <span>{projectroom}</span>
            <span className="font-bold">{table}테이블</span>
          </div>
          <div
            className={twMerge([
              "pr-4 font-bold",
              STATE_COLOR[reservationState],
            ])}
          >
            {reservationState}
          </div>
        </div>
      </div>
    </div>
  );
};
