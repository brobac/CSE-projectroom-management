import { useRecoilState } from "recoil";
import dayjs from "dayjs";

import { reservationDateState } from "@/stores/reservation";
import { useModal } from "@/hooks/useModal";
import { DatePicker } from "@components";

import { Modal } from "./Modal";

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
          enableStartDate={dayjs(new Date())
            .hour(8)
            .minute(0)
            .second(0)
            .millisecond(0)
            .toDate()}
          enableEndDate={dayjs(new Date()).add(14, "day").toDate()}
        />
      </div>
    </Modal>
  );
};
