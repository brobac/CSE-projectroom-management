import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";
import { DatePicker } from "@components";
import { useModal } from "@/hooks/useModal";
import { ReservationDatepickerModal } from "@components/modals/ReservationDatePickerModal";

export const DateSelectSection = () => {
  const { openModal } = useModal("modal-reservation-date-picker");
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-base-content">날짜선택</h2>
      <div className="flex w-full justify-center">
        <button>
          <IoCaretBackOutline size={32} className="text-base-content" />
        </button>
        <span onClick={openModal}>10.4</span>
        <button>
          <IoCaretForwardOutline size={32} className="text-base-content" />
        </button>
      </div>
      <ReservationDatepickerModal />
    </section>
  );
};
