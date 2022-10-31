import { getMinusOneDay, getPlusOneDay } from "@utils";
import dayjs from "dayjs";
import { atom, useRecoilState } from "recoil";

export const ROOM_NAME_LIST = ["D330", "DB134"] as const;

export const TABLE_INFO = {
  D330: ["1", "2", "3", "4", "5", "6"] as const,
  DB134: ["1", "2", "3", "4", "5", "6", "7", "8"] as const,
};

export const reservationProjectroomState = atom<typeof ROOM_NAME_LIST[number]>({
  key: "reservationProjectroomState",
  default: ROOM_NAME_LIST[0],
});

export const reservationDateState = atom({
  key: "reservationDateState",
  default: new Date(),
});

export const useReservationDateState = () => {
  const [reservationDate, setResetvationDate] =
    useRecoilState(reservationDateState);

  const firstTime = dayjs(reservationDate)
    .hour(8)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toDate();

  const lastTime = getPlusOneDay(firstTime);

  const minusOneDay = () => {
    setResetvationDate(getMinusOneDay(reservationDate));
  };

  const plusOneDay = () => {
    setResetvationDate(getPlusOneDay(reservationDate));
  };

  return {
    reservationDate,
    setResetvationDate,
    firstTime,
    lastTime,
    minusOneDay,
    plusOneDay,
  };
};

export const reservationTimeState = atom<{
  startTime: Date | undefined;
  endTime: Date | undefined;
}>({
  key: "reservationStartTimeState",
  default: {
    startTime: undefined,
    endTime: undefined,
  },
});

export const useReservationTimeState = () => {
  const [reservationTime, setReservationTime] =
    useRecoilState(reservationTimeState);

  const setStartTime = (startTime: Date) => {
    setReservationTime((prev) => ({ ...prev, startTime }));
  };

  const setEndTime = (endTime: Date) => {
    setReservationTime((prev) => ({ ...prev, endTime }));
  };

  return {
    startTime: reservationTime.startTime,
    endTime: reservationTime.endTime,
    setStartTime,
    setEndTime,
  };
};
