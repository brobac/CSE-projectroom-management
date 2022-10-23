import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";
import { DatePicker } from "@components";

export const DateSelectSection = () => {
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-base-content">날짜선택</h2>
      <div className="flex w-full justify-center">
        <button>
          <IoCaretBackOutline size={32} className="text-base-content" />
        </button>
        <span>10.4</span>
        <button>
          <IoCaretForwardOutline size={32} className="text-base-content" />
        </button>
      </div>
      <DatePicker
        enableStartDate={new Date("2022-09-10")}
        enableEndDate={new Date("2022.11.1")}
      />
    </section>
  );
};
