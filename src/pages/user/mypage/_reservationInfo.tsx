import { DateValue, ProjectRoom, ReservationStateType } from "@types";
import { toHHMM, toYYYYMD_KO_DAY_DOT } from "@utils";
import { twMerge } from "tailwind-merge";

export type UnfinishedReservationProps = {
  id: number;
  reservationDate: DateValue;
  startDateTime: DateValue;
  endDateTime: DateValue;
  projectroom: ProjectRoom;
  table: string;
  qrCode: string;
  reservationState: ReservationStateType;
};

export const UnfinishedReservation = ({
  reservationDate,
  startDateTime,
  endDateTime,
  projectroom,
  table,
  qrCode,
  reservationState,
}: UnfinishedReservationProps) => {
  const ableToCancel = () => {
    return reservationState === "예약완료";
  };

  const ableToReturn = () => {
    return ["사용중", "반납 대기중"].includes(reservationState);
  };

  return (
    <div
      tabIndex={0}
      className="collapse-plus rounded-box collapse w-full border border-base-300 bg-base-100"
    >
      <input type="checkbox" className="peer" />
      <div className="divide-x-21 collapse-title flex w-full divide-x-2 divide-base-300">
        <div className="flex flex-col items-center pr-4">
          <span>{toYYYYMD_KO_DAY_DOT(reservationDate)}</span>
          <span className="font-bold">
            {`${toHHMM(startDateTime)} ~ ${toHHMM(endDateTime)}`}
          </span>
        </div>
        <div>
          <div className="flex flex-col items-center pl-4">
            <span>{projectroom.roomName}</span>
            <span className="font-bold">{table}테이블</span>
          </div>
        </div>
      </div>
      <div className="collapse-content flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <button
            disabled={!ableToCancel()}
            className="btn-outline btn-error btn-sm btn px-8"
          >
            예약취소
          </button>
          <button
            disabled={!ableToReturn()}
            className={twMerge(["btn-outline btn-primary btn-sm btn px-8"])}
          >
            반납하기
          </button>
        </div>
        <div className="w-32">
          <img src={qrCode} alt="" className="w-full" />
        </div>
      </div>
    </div>
  );
};
