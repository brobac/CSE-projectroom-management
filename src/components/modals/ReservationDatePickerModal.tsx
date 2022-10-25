import { useRecoilState } from "recoil";
import { DatePicker } from "@components";
import { reservationDateState } from "@/stores/reservation";
import { useModal } from "@/hooks/useModal";
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
          enableStartDate="2022-9-1"
          enableEndDate="2022-12-23"
        />
      </div>
    </Modal>
  );
};
