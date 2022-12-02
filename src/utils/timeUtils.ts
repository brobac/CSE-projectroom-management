import dayjs from "dayjs";
import { DateValue } from "@types";

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

/**
 * @return {string}
 * i.g. 2022.10.04(화)
 */
export const toYYYYMD_KO_DAY_DOT = (target: DateValue) => {
  const date = dayjs(target);
  return `${date.format("YYYY.M.D")}(${KO_DAY[date.day()]})`;
};

export const toYYYYMD_DOT = (target: DateValue) => {
  const date = dayjs(target);
  return date.format("YYYY.M.D");
};

export const toHMM = (date: DateValue) => {
  return dayjs(date).format("H:mm");
};

export const toHHMM = (date: DateValue) => {
  return dayjs(date).format("HH:mm");
};

export const toFullDateTime_SLASH = (target: DateValue) => {
  const date = dayjs(target);
  return date.format("YYYY/MM/DD HH:mm:ss");
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

/**
 * 날짜까지만 비교한다. 시간은 고려하지 않는다.
 */
export const isBeforeDay = (target: DateValue, compareDate: DateValue) => {
  return dayjs(target).isBefore(compareDate, "day");
};

/**
 * 날짜까지만 비교한다. 시간은 고려하지 않는다.
 */
export const isAfterDay = (target: DateValue, compareDate: DateValue) => {
  return dayjs(target).isAfter(compareDate, "day");
};

export const isBeforeNow = (target: DateValue) => {
  return dayjs(target).isBefore(new Date());
};

export const isBeforeHour = (target: DateValue, hour: number) => {
  return new Date(target).getHours() < hour;
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

export const isSameDayOrBefore = (
  target: DateValue,
  compareDate: DateValue,
) => {
  return (
    dayjs(target).isSame(compareDate, "day") ||
    dayjs(target).isBefore(compareDate, "day")
  );
};

export const isSameDayOrAfter = (target: DateValue, compareDate: DateValue) => {
  return (
    dayjs(target).isSame(compareDate, "day") ||
    dayjs(target).isAfter(compareDate, "day")
  );
};

/**
 *
 * i.g. 11:03 => 11:30, 11:43 => 12:00
 */
export const roundUp30MinuteIncrements = (target: DateValue) => {
  const date = dayjs(target).second(0).millisecond(0);
  if (date.get("minute") < 30) return date.set("minute", 30).toDate();
  else return date.add(1, "hour").set("minute", 0).toDate();
};
