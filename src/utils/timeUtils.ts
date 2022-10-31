import { DateValue } from "@types";
import dayjs from "dayjs";

export const KO_DAY = ["일", "월", "화", "수", "목", "금", "토"] as const;

export const toTwoDigit = (v: string | number) => (+v < 10 ? "0" + v : "" + v);

export const getDateData = (target: DateValue) => {
  const time = new Date(target);
  return {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    date: time.getDate(),
    dayIdx: time.getDay(),
    day_ko: KO_DAY[time.getDay()],
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
  };
};

export const getDateDataTwoDigit = (target: DateValue) => {
  const date = getDateData(target);
  return {
    ...date,
    year: date.year % 100,
    month: toTwoDigit(date.month),
    date: toTwoDigit(date.date),
    hour: toTwoDigit(date.hour),
    minute: toTwoDigit(date.minute),
    second: toTwoDigit(date.second),
  };
};

export const toHMM = (date: DateValue) => {
  return dayjs(date).format("H:mm");
};

export const getFirstDayOfPrevMonth = (date: DateValue) => {
  return dayjs(date).subtract(1, "month").set("date", 1).toDate();
};

export const getFirstDayOfMonth = (date: DateValue) => {
  return dayjs(date).set("date", 1).toDate();
};

export const getFirstDayOfNextMonth = (date: DateValue) => {
  return dayjs(date).add(1, "month").set("date", 1).toDate();
};

export const getLastDayOfMonth = (date: DateValue) => {
  return dayjs(date).endOf("month").toDate();
};

export const getYear = (date: DateValue) => {
  return dayjs(date).get("year");
};

export const getMonth = (date: DateValue) => {
  return dayjs(date).get("month") + 1;
};

export const getDate = (date: DateValue) => {
  return dayjs(date).get("date");
};

export const getMinusOneDay = (date: DateValue) => {
  return dayjs(date).subtract(1, "day").toDate();
};

export const getPlusOneDay = (date: DateValue) => {
  return dayjs(date).add(1, "day").toDate();
};

export const isSame = (date1: DateValue, date2: DateValue) => {
  return dayjs(date1).isSame(dayjs(date2));
};

export const isSameDay = (date1: DateValue, date2: DateValue) => {
  return dayjs(date1).isSame(dayjs(date2), "day");
};

export const isSameHour = (date1: DateValue, date2: DateValue) => {
  return dayjs(date1).isSame(dayjs(date2), "hour");
};

export const isSameMinute = (date1: DateValue, date2: DateValue) => {
  return dayjs(date1).isSame(dayjs(date2), "minute");
};

export const isBefore = (target: DateValue, compareDate: DateValue) => {
  return dayjs(target).isBefore(compareDate);
};

export const isAfter = (target: DateValue, compareDate: DateValue) => {
  return dayjs(target).isAfter(compareDate);
};

export const isSameOrBefore = (target: DateValue, compareDate: DateValue) => {
  return (
    dayjs(target).isSame(compareDate) || dayjs(target).isBefore(compareDate)
  );
};

export const isSameOrAfter = (target: DateValue, compareDate: DateValue) => {
  return (
    dayjs(target).isSame(compareDate) || dayjs(target).isAfter(compareDate)
  );
};

export const roundUp30MinuteIncrements = (target: DateValue) => {
  const date = dayjs(target).second(0).millisecond(0);
  if (date.get("minute") <= 30) return date.set("minute", 30).toDate();
  else return date.add(1, "hour").set("minute", 0).toDate();
};
