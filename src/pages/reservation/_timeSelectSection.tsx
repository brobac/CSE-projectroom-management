import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import {
  reservationDateState,
  reservationProjectroomState,
  ROOM_NAME_LIST,
  TABLE_INFO,
  useReservationTimeState,
} from "@/stores/reservation";
import { DateValue } from "@types";
import {
  isAfter,
  isBefore,
  isSameOrAfter,
  isSameOrBefore,
  roundUp30MinuteIncrements,
  toHMM,
} from "@utils";

import { TEMP_RESERVATION_LIST } from "./_tempData";

export const TimeSelectSection = () => {
  const [startTimeList, setStartTimeList] = useState<
    { date: Date; disabled: boolean; isFirstTime?: boolean }[]
  >([]);
  const [endTimeList, setEndTimeList] = useState<
    { date: Date; disabled: boolean; isFirstTime?: boolean }[]
  >([]);
  const { startTime, endTime, setStartTime, setEndTime } =
    useReservationTimeState();
  const reservationDate = useRecoilValue(reservationDateState);
  const reservationProjectroom = useRecoilValue(reservationProjectroomState);

  const onChangeStartTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTime(new Date(e.target.value));
  };

  const onChangeEndTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTime(new Date(e.target.value));
  };

  useEffect(() => {
    const newStartTimeList = generateStartTimeList(
      reservationDate,
      reservationProjectroom,
      TEMP_RESERVATION_LIST,
    );
    setStartTimeList(newStartTimeList);
    setStartTime(
      new Date(
        newStartTimeList.find((v) => v.isFirstTime)?.date.toUTCString()!,
      ),
    );
  }, [reservationDate, reservationProjectroom]);

  useEffect(() => {
    const newEndTimeList = generateEndTimeList(
      reservationDate,
      startTime,
      reservationProjectroom,
      TEMP_RESERVATION_LIST,
    );
    setEndTimeList(newEndTimeList);
    if (startTime) {
      setEndTime(
        new Date(
          newEndTimeList.find((v) => v.isFirstTime)?.date.toUTCString()!,
        ),
      );
    }
  }, [startTime]);

  return (
    <section className="flex flex-col items-center gap-4 px-4 py-8">
      <h2 className="text-3xl font-bold text-base-content">시간 선택</h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-4">
          <select
            className="w- select-bordered select w-32"
            value={startTime?.toUTCString()}
            onChange={(e) => onChangeStartTime(e)}
          >
            {startTimeList.map((t) => (
              <option
                key={t.date.toUTCString()}
                value={t.date.toUTCString()}
                disabled={t.disabled}
              >
                {`${toHMM(t.date)}`}
              </option>
            ))}
          </select>
          <span className="text-xl font-bold text-base-content">부터</span>
        </div>
        <div className="flex items-center gap-4">
          <select
            className="select-bordered select w-32"
            value={endTime?.toUTCString()}
            onChange={onChangeEndTime}
          >
            {endTimeList.map((t) => (
              <option
                key={t.date.toUTCString()}
                value={t.date.toUTCString()}
                disabled={t.disabled}
              >
                {`${toHMM(t.date)}`}
              </option>
            ))}
          </select>
          <span className="text-xl font-bold text-base-content">까지</span>
        </div>
      </div>
    </section>
  );
};

type Reservation = {
  room: string;
  table: string;
  startDateTime: DateValue;
  endDateTime: DateValue;
};

const generateStartTimeList = (
  date: DateValue,
  projectRoom: typeof ROOM_NAME_LIST[number],
  reservationList: Reservation[],
) => {
  const start = dayjs(date).set("hour", 8).set("minute", 0).set("second", 0);
  const filteredList = reservationList.filter((v) => v.room === projectRoom);
  const result: { date: Date; disabled: boolean; isFirstTime?: boolean }[] = [];

  for (let i = 0; i < 48; i++) {
    const time = start.add(30 * i, "minute").toDate();
    if (
      isBefore(time, roundUp30MinuteIncrements(new Date())) ||
      filteredList.filter(
        (v) =>
          isSameOrBefore(v.startDateTime, time) &&
          isSameOrAfter(v.endDateTime, time),
      ).length >= TABLE_INFO[projectRoom].length
    ) {
      result.push({ date: time, disabled: true });
    } else {
      result.push({ date: time, disabled: false });
    }
  }

  for (let i = 0; i < result.length; i++) {
    if (!result[i].disabled) {
      result[i].isFirstTime = true;
      break;
    }
  }
  return result;
};

const generateEndTimeList = (
  reservationDate: DateValue,
  startDateTime: DateValue | undefined,
  projectRoom: typeof ROOM_NAME_LIST[number],
  reservationList: Reservation[],
) => {
  if (!startDateTime) return [];
  const firstEndTime = dayjs(startDateTime).add(30, "minute");
  const lastEndTime = dayjs(reservationDate)
    .add(1, "day")
    .set("hour", 8)
    .set("minute", 0)
    .set("second", 0);

  const filteredList = reservationList.filter((v) => v.room === projectRoom);
  const result: { date: Date; disabled: boolean; isFirstTime?: boolean }[] = [];
  let blocked = false;
  for (let i = 0; i < 8; i++) {
    const time = firstEndTime.add(30 * i, "minute").toDate();
    if (isAfter(time, lastEndTime.toDate())) break;
    if (blocked) {
      result.push({ date: time, disabled: true });
    } else if (
      filteredList.filter(
        (v) =>
          isBefore(v.startDateTime, time) && isSameOrAfter(v.endDateTime, time),
      ).length === TABLE_INFO[projectRoom].length
    ) {
      blocked = true;
      result.push({ date: time, disabled: true });
    } else {
      result.push({ date: time, disabled: false });
    }
  }

  for (let i = 0; i < result.length; i++) {
    if (!result[i].disabled) {
      result[i].isFirstTime = true;
      break;
    }
  }
  return result;
};
