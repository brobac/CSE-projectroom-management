import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import {
  reservationDateState,
  reservationProjectRoomState,
  useReservationListState,
  useReservationTimeState,
} from "@/stores/reservation";
import { DateValue, ProjectRoom, Reservation } from "@types";
import {
  isAfter,
  isBefore,
  isBeforeNow,
  isSameOrAfter,
  isSameOrBefore,
  roundUp30MinuteIncrements,
  toHMM,
} from "@utils";

export const TimeSelectSection = () => {
  // 예약에 사용되는 상태들
  const reservationDate = useRecoilValue(reservationDateState);
  const reservationProjectroom = useRecoilValue(reservationProjectRoomState);
  const { startTime, endTime, setStartTime, setEndTime } =
    useReservationTimeState();
  const { reservationList } = useReservationListState();

  //select에 option으로 들어갈 시간리스트
  const [startTimeList, setStartTimeList] = useState<ReservationTime[]>([]);
  const [endTimeList, setEndTimeList] = useState<ReservationTime[]>([]);

  const onChangeStartTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTime(new Date(e.target.value));
  };

  const onChangeEndTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTime(new Date(e.target.value));
  };

  useEffect(() => {
    if (!reservationProjectroom) return;
    const newStartTimeList = generateStartTimeList(
      reservationDate,
      reservationProjectroom,
      reservationList,
    );
    setStartTimeList(newStartTimeList);
    setStartTime(
      new Date(
        newStartTimeList.find((v) => v.isFirstTime)?.date.toUTCString()!,
      ),
    );
  }, [reservationDate, reservationList, reservationProjectroom]);

  useEffect(() => {
    if (!reservationProjectroom) return;

    const newEndTimeList = generateEndTimeList(
      reservationDate,
      startTime,
      reservationProjectroom,
      reservationList,
    );
    setEndTimeList(newEndTimeList);
    if (startTime) {
      setEndTime(
        new Date(
          newEndTimeList.find((v) => v.isFirstTime)?.date.toUTCString()!,
        ),
      );
    }
  }, [reservationDate, reservationList, reservationProjectroom, startTime]);

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

type ReservationTime = {
  date: Date;
  disabled: boolean;
  isFirstTime?: boolean;
};

const isFullReservedTime = (
  time: Date,
  projectRoom: ProjectRoom,
  reservationList: Reservation[],
) => {
  return (
    reservationList.filter(
      (v) => isSameOrBefore(v.startAt, time) && isSameOrAfter(v.endAt, time),
    ).length >= projectRoom.projectTableList.length
  );
};

const generateStartTimeList = (
  date: DateValue,
  projectRoom: ProjectRoom,
  reservationList: Reservation[],
) => {
  const start = dayjs(date).set("hour", 8).set("minute", 0).set("second", 0);
  const result: ReservationTime[] = [];

  //48의 의미 하루 24시간 / 예약시간단위(30분) = 48;
  for (let i = 0; i < 48; i++) {
    const time = start.add(30 * i, "minute").toDate();
    if (
      isBeforeNow(time) ||
      isFullReservedTime(time, projectRoom, reservationList)
    ) {
      result.push({ date: time, disabled: true });
    } else {
      result.push({ date: time, disabled: false });
    }
  }

  // 08:00 부터 시작해서 선택 가능한 첫시간에 isFirstTime을 true로 설정
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
  projectRoom: ProjectRoom,
  reservationList: Reservation[],
) => {
  if (!startDateTime) return [];
  const firstEndTime = dayjs(startDateTime).add(30, "minute");
  const lastEndTime = dayjs(reservationDate)
    .add(1, "day")
    .set("hour", 8)
    .set("minute", 0)
    .set("second", 0);

  const result: ReservationTime[] = [];
  let blocked = false;
  //8의 의미 : 최대예약시간 = 4시간, 예약은 30분 단위 4시간 / 30분 = 8
  for (let i = 0; i < 8; i++) {
    const time = firstEndTime.add(30 * i, "minute").toDate();
    if (isAfter(time, lastEndTime.toDate())) break;
    if (blocked) {
      result.push({ date: time, disabled: true });
    } else if (
      reservationList.filter(
        (v) => isBefore(v.startAt, time) && isSameOrAfter(v.endAt, time),
      ).length === projectRoom.projectTableList.length
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
