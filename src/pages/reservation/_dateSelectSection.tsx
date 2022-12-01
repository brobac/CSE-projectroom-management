import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

import { useReservationDateState } from "@/stores/reservation";
import { useModal } from "@/hooks/useModal";
import {
  getDate,
  getMonth,
  isBefore,
  isBeforeHour,
  isSameDay,
  isSameDayOrAfter,
  isSameOrAfter,
  isSameOrBefore,
} from "@utils";

export const DateSelectSection = () => {
  const { reservationDate, minusOneDay, plusOneDay } =
    useReservationDateState();

  const { openModal } = useModal("modal-reservation-date-picker");
  return (
    <section className="flex flex-col items-center gap-4 px-4 py-8">
      <h2 className="text-3xl font-bold text-base-content">날짜선택</h2>
      <div className="flex  w-36 items-end justify-between">
        <button
          onClick={minusOneDay}
          disabled={
            isBeforeHour(new Date(), 8)
              ? isBefore(reservationDate, new Date())
              : isSameDay(reservationDate, new Date())
          }
          className={twMerge(["disabled:text-base-200", "text-base-content"])}
        >
          <IoCaretBackOutline size={32} />
        </button>
        <div
          onClick={openModal}
          className="flex cursor-pointer flex-col items-center px-2"
        >
          <span className="font-bold">{`${getMonth(reservationDate)}월`}</span>
          <span className="text-3xl font-bold">{getDate(reservationDate)}</span>
        </div>
        {/* TODO: 12.1(목) 학교와서 15일에서 16일 못넘어가게 멈추는지 확인하자 */}
        <button
          onClick={plusOneDay}
          disabled={isSameDayOrAfter(
            reservationDate,
            dayjs(new Date())
              .add(isBeforeHour(new Date(), 8) ? 14 : 13, "day")
              .hour(0)
              .minute(0)
              .second(0)
              .millisecond(0)
              .toDate(),
          )}
          className={twMerge(["disabled:text-base-200", "text-base-content"])}
        >
          <IoCaretForwardOutline size={32} />
        </button>
      </div>
    </section>
  );
};
