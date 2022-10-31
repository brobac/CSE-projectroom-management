import {
  reservationDateState,
  reservationProjectroomState,
  ROOM_NAME_LIST,
  TABLE_INFO,
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
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const TEMP_RESERVATION_LIST = [
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-11-01 08:00",
    endDateTime: "2022-11-01 11:00",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-11-01 08:00",
    endDateTime: "2022-11-01 11:30",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-11-01 08:00",
    endDateTime: "2022-11-01 11:30",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-11-01 08:00",
    endDateTime: "2022-11-01 11:30",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-11-01 08:00",
    endDateTime: "2022-11-01 11:30",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-11-01 08:00",
    endDateTime: "2022-11-01 11:30",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-11-01 11:30",
    endDateTime: "2022-11-01 12:00",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-11-01 11:30",
    endDateTime: "2022-11-01 12:00",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-11-01 11:30",
    endDateTime: "2022-11-01 12:00",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-11-01 11:30",
    endDateTime: "2022-11-01 12:00",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-11-01 11:30",
    endDateTime: "2022-11-01 12:00",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-11-01 11:30",
    endDateTime: "2022-11-01 12:00",
  },
];

export const TimeSelectSection = () => {
  const [startTimeList, setStartTimeList] = useState<
    { date: Date; disabled: boolean; isFirstTime?: boolean }[]
  >([]);
  const [endTimeList, setEndTimeList] = useState<
    { date: Date; disabled: boolean; isFirstTime?: boolean }[]
  >([]);
  const [startTime, setstartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const reservationDate = useRecoilValue(reservationDateState);
  const reservationProjectroom = useRecoilValue(reservationProjectroomState);

  const onChangeStartTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setstartTime(e.target.value);
  };

  const onChangeEndTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTime(e.target.value);
  };

  useEffect(() => {
    const newStartTimeList = generateStartTimeList(
      reservationDate,
      reservationProjectroom,
      TEMP_RESERVATION_LIST,
    );
    setStartTimeList(newStartTimeList);
    setstartTime(
      newStartTimeList.find((v) => v.isFirstTime)?.date.toUTCString()!,
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
    setEndTime(newEndTimeList.find((v) => v.isFirstTime)?.date.toUTCString()!);
  }, [startTime]);

  return (
    <section className="flex flex-col items-center gap-4 px-4 py-8">
      <h2 className="text-3xl font-bold text-base-content">시간 선택</h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-4">
          <select
            className="w- select-bordered select w-32"
            value={startTime}
            onChange={(e) => onChangeStartTime(e)}
          >
            {startTimeList.map((t) => (
              <option
                key={t.date.toISOString()}
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
            value={endTime}
            onChange={onChangeEndTime}
          >
            {endTimeList.map((t) => (
              <option
                key={t.date.toISOString()}
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
  startDateTime: DateValue,
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

  for (let i = 0; i < 8; i++) {
    const time = firstEndTime.add(30 * i, "minute").toDate();
    if (isAfter(time, lastEndTime.toDate())) break;
    if (
      filteredList.filter(
        (v) =>
          isSameOrBefore(v.startDateTime, time) &&
          isSameOrAfter(v.endDateTime, time),
      ).length === TABLE_INFO[projectRoom].length
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
