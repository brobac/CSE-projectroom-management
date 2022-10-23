import { DateValue } from "@types";
import dayjs from "dayjs";

export const KO_DAY = ["일", "월", "화", "수", "목", "금", "토"] as const;

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
