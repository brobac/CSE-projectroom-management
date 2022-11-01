import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";

import { DateValue } from "@types";
import {
  chunkArray,
  getFirstDayOfMonth,
  getFirstDayOfNextMonth,
  getFirstDayOfPrevMonth,
  getLastDayOfMonth,
  getMonth,
  isAfter,
  isBefore,
  isSameDay,
  KO_DAY,
} from "@utils";

type DatePikerProps = {
  selectedDate?: DateValue;
  enableStartDate?: DateValue;
  enableEndDate?: DateValue;
  disableDates?: DateValue[];
  onClickDate?: (date: Date) => void;
};
export const DatePicker = ({
  selectedDate,
  enableStartDate,
  enableEndDate,
  onClickDate,
}: DatePikerProps) => {
  const [currentYearMonth, setCurrentYearMonth] = useState(
    new Date(selectedDate!),
  );
  //서버에서 받기 전 목업용 state
  const [calendarDates, setCalendarDates] = useState(
    chunkToWeeks(getCalendarDates(currentYearMonth)),
  );
  const [disabledToPrevMonth, setDisableToPrevMonth] = useState(false);
  const [disabledToNextMonth, setDisableToNextMonth] = useState(false);

  const ableToPrevMonth = () => {
    if (!enableStartDate) return true;
    return dayjs(enableStartDate).isBefore(currentYearMonth, "month");
  };
  const ableToNextMonth = () => {
    if (!enableEndDate) return true;
    return dayjs(enableEndDate).isAfter(currentYearMonth, "month");
  };

  const toPrevMonth = () => {
    setCurrentYearMonth(getFirstDayOfPrevMonth(currentYearMonth));
  };

  const toNextMonth = () => {
    setCurrentYearMonth(getFirstDayOfNextMonth(currentYearMonth));
  };

  useEffect(() => {
    setCurrentYearMonth(new Date(selectedDate!));
  }, [selectedDate]);

  useEffect(() => {
    setDisableToPrevMonth(!ableToPrevMonth());
    setDisableToNextMonth(!ableToNextMonth());
    setCalendarDates(chunkToWeeks(getCalendarDates(currentYearMonth)));
  }, [currentYearMonth]);

  return (
    <div className="flex h-full w-full flex-col items-center">
      {/* Header */}
      <div className="mb-6 flex items-center">
        <button onClick={toPrevMonth} disabled={disabledToPrevMonth}>
          <IoCaretBackOutline
            size={32}
            className={[
              "text-base-content",
              disabledToPrevMonth && "opacity-30",
            ].join(" ")}
          />
        </button>
        <span className="px-4 text-3xl font-bold text-base-content ">
          {getMonth(currentYearMonth)}
        </span>
        <button onClick={toNextMonth} disabled={disabledToNextMonth}>
          <IoCaretForwardOutline
            size={32}
            className={[
              "text-base-content",
              disabledToNextMonth && "opacity-30",
            ].join(" ")}
          />
        </button>
      </div>
      {/* body */}
      <div className="grid w-full grid-cols-7">
        {KO_DAY.map((day) => (
          <div className="text-center font-bold" key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className=" h-full w-full">
        {calendarDates.map((week, i) => (
          <div
            className={["grid grid-cols-7", `h-1/${calendarDates.length}`].join(
              " ",
            )}
            key={i}
          >
            {week.map((day) => (
              <DateCell
                selected={isSameDay(selectedDate!, day)}
                disabled={
                  isBefore(day, enableStartDate!) ||
                  isAfter(day, enableEndDate!)
                }
                date={day}
                key={day.getDate()}
                onClick={onClickDate}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

type DateCellProps = {
  date: Date;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (date: Date) => void;
};

const DateCell = ({ date, selected, disabled, onClick }: DateCellProps) => {
  return (
    <div
      onClick={!disabled ? () => onClick!(date) : undefined}
      className={twMerge([
        "group flex h-full cursor-pointer items-center justify-center",
        disabled && "cursor-not-allowed",
      ])}
      key={date.getDate()}
    >
      <div
        className={twMerge([
          "flex h-12 w-12 items-center justify-center rounded text-lg transition-colors group-hover:text-primary",
          selected && "bg-primary text-base-100 group-hover:text-base-100",
          disabled && " text-base-200 group-hover:text-base-200",
        ])}
      >
        {date.getDate()}
      </div>
    </div>
  );
};

//서버에서 받기 전 임시로 때우는 용도
const getCalendarDates = (yearMonth: DateValue) => {
  const firstDay = getFirstDayOfMonth(yearMonth);
  const lastDay = getLastDayOfMonth(yearMonth);
  const dates = [];

  for (let i = firstDay.getDay(); i > 0; i--) {
    dates.push(dayjs(firstDay).subtract(i, "day").toDate());
  }

  for (let i = 0; i < lastDay.getDate(); i++) {
    dates.push(dayjs(firstDay).add(i, "day").toDate());
  }

  for (let i = 0; i < 6 - lastDay.getDay(); i++) {
    dates.push(
      dayjs(lastDay)
        .add(i + 1, "day")
        .toDate(),
    );
  }
  return dates;
};

const chunkToWeeks = (dates: Date[]) => {
  return chunkArray<Date>(dates, 7);
};
