import { useRecoilState } from "recoil";
import dayjs from "dayjs";

import { reservationDateState } from "@/stores/reservation";
import { useModal } from "@/hooks/useModal";
import { DatePicker } from "@components";

import { Modal } from "./Modal";
import { isBefore, isBeforeHour } from "@utils";

export const ReservationDatepickerModal = () => {
  const [reservationDate, setReservationDate] =
    useRecoilState(reservationDateState);

  const { closeModal } = useModal("modal-reservation-date-picker");
  const onClickDate = (date: Date) => {
    setReservationDate(date);
    closeModal();
  };

  return (
    <Modal type="modal-reservation-date-picker" closeButton>
      <div className="h-96 w-full">
        <DatePicker
          selectedDate={reservationDate}
          onClickDate={onClickDate}
          enableStartDate={
            isBefore(new Date(), dayjs().hour(7).minute(30).toDate())
              ? dayjs(new Date()).subtract(1, "day").toDate()
              : new Date()
          }
          enableEndDate={dayjs(new Date()).add(14, "day").toDate()}
        />
      </div>
    </Modal>
  );
};
