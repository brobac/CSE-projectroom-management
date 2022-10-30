import {
  reservationDateState,
  reservationProjectroomState,
  ROOM_NAME_LIST,
  TABLE_INFO,
} from "@/stores/reservation";
import { DateValue } from "@types";
import {
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
    startDateTime: "2022-10-30 08:00",
    endDateTime: "2022-10-30 11:00",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-10-30 08:00",
    endDateTime: "2022-10-30 11:00",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-10-30 08:00",
    endDateTime: "2022-10-30 11:30",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-10-30 08:00",
    endDateTime: "2022-10-30 11:30",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-10-30 08:00",
    endDateTime: "2022-10-30 11:30",
  },
  {
    room: "D330",
    table: "a1",
    startDateTime: "2022-10-30 08:00",
    endDateTime: "2022-10-30 11:00",
  },
];

export const TimeSelectSection = () => {
  const [startTimeList, setStartTimeList] = useState<
    { date: Date; disabled: boolean; isFirstTime?: boolean }[]
  >([]);
  const [selectedTime, setSelectedTime] = useState("");

  const reservationDate = useRecoilValue(reservationDateState);
  const reservationProjectroom = useRecoilValue(reservationProjectroomState);

  useEffect(() => {
    const newStartTimeList = generateStartTimeList(
      reservationDate,
      reservationProjectroom,
      TEMP_RESERVATION_LIST,
    );
    setStartTimeList(newStartTimeList);
    setSelectedTime(
      newStartTimeList.find((v) => v.isFirstTime)?.date.toUTCString()!,
    );
  }, [reservationDate, reservationProjectroom]);

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  return (
    <section className="flex flex-col items-center gap-4 px-4 py-8">
      <h2 className="text-3xl font-bold text-base-content">시간 선택</h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-4">
          <select
            className="w- select-bordered select w-32"
            value={selectedTime}
            onChange={(e) => onChangeSelect(e)}
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
          <select className="select-bordered select w-32"></select>
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
  startDate: DateValue,
  projectRoom: typeof ROOM_NAME_LIST[number],
  reservationList: Reservation[],
) => {
  const start = dayjs(startDate)
    .set("hour", 8)
    .set("minute", 0)
    .set("second", 0);
  const filteredList = reservationList.filter((v) => v.room === projectRoom);
  const result: { date: Date; disabled: boolean; isFirstTime?: boolean }[] = [];

  for (let i = 0; i < 48; i++) {
    const time = start.add(30 * i, "minute").toDate();
    if (
      isSameOrBefore(time, roundUp30MinuteIncrements(new Date())) ||
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
