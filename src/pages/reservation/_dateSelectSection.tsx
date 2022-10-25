import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";
import { useModal } from "@/hooks/useModal";
import { useReservationDateState } from "@/stores/reservation";
import { getDate, getMonth } from "@utils";

export const DateSelectSection = () => {
  const {
    state: reservationDate,
    minusOneDay,
    plusOneDay,
  } = useReservationDateState();

  const { openModal } = useModal("modal-reservation-date-picker");
  return (
    <section className="flex flex-col items-center gap-4 px-4 py-8">
      <h2 className="text-3xl font-bold text-base-content">날짜선택</h2>
      <div className="flex  w-36 items-end justify-between">
        <button onClick={minusOneDay}>
          <IoCaretBackOutline size={32} className="text-base-content" />
        </button>
        <div
          onClick={openModal}
          className="flex cursor-pointer flex-col items-center px-2"
        >
          <span className="font-bold">{`${getMonth(reservationDate)}월`}</span>
          <span className="text-3xl font-bold">{getDate(reservationDate)}</span>
        </div>
        <button onClick={plusOneDay}>
          <IoCaretForwardOutline size={32} className="text-base-content" />
        </button>
      </div>
    </section>
  );
};
