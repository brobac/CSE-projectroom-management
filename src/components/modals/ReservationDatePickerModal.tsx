import { DatePicker } from "@components/Datepicker";
import { Modal } from "./Modal";

export const ReservationDatepickerModal = () => {
  return (
    <Modal type="modal-reservation-date-picker" closeButton>
      <div className="h-96 w-full">
        <DatePicker />
      </div>
    </Modal>
  );
};
