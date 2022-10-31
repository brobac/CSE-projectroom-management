import { useRecoilState } from "recoil";
import { DatePicker } from "@components";
import { reservationDateState } from "@/stores/reservation";
import { useModal } from "@/hooks/useModal";
import { Modal } from "./Modal";
import { getMinusOneDay } from "@utils";
import dayjs from "dayjs";

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
          enableStartDate={dayjs(getMinusOneDay(new Date()))
            .hour(0)
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
