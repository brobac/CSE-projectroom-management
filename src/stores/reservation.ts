import { queryKeys } from "@/services/react-query/queryKeys";
import { fetchReservationListByProjectroomId } from "@services";
import { useQuery } from "@tanstack/react-query";
import { ProjectRoom, Reservation } from "@types";
import {
  getMinusOneDay,
  getPlusOneDay,
  isBeforeHour,
  toFullDateTime_SLASH,
} from "@utils";
import dayjs from "dayjs";
import { atom, useRecoilState, useRecoilValue } from "recoil";

export const reservationListState = atom<Reservation[]>({
  key: "reservationListState",
  default: [],
});

export const useReservationListState = () => {
  const [reservationList, setReservationList] =
    useRecoilState(reservationListState);
  const reservationProjectRoom = useRecoilValue(reservationProjectRoomState);
  const { reservationDate, firstDateTime, lastDateTime } =
    useReservationDateState();

  const { isLoading } = useQuery(
    [
      queryKeys.reservation,
      reservationProjectRoom?.projectRoomId,
      reservationDate,
    ],
    () =>
      fetchReservationListByProjectroomId(
        reservationProjectRoom?.projectRoomId!,
        {
          firstDateTime: toFullDateTime_SLASH(firstDateTime),
          lastDateTime: toFullDateTime_SLASH(lastDateTime),
        },
      ),
    {
      enabled: reservationProjectRoom !== undefined,
      onSuccess: (res) => {
        setReservationList(res.result);
      },
    },
  );

  return { reservationList, isLoading };
};

//예약하려고 선택한 프로젝트룸 정보
export const reservationProjectRoomState = atom<ProjectRoom | undefined>({
  key: "reservationProjectRoomState",
  default: undefined,
});

export const reservationDateState = atom({
  key: "reservationDateState",
  default: isBeforeHour(new Date(), 8)
    ? dayjs(new Date())
        .hour(8)
        .minute(0)
        .second(0)
        .millisecond(0)
        .subtract(1, "day")
        .toDate()
    : new Date(),
});

export const useReservationDateState = () => {
  const [reservationDate, setReservationDate] =
    useRecoilState(reservationDateState);

  const firstDateTime = dayjs(reservationDate)
    .hour(8)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toDate();

  const lastDateTime = getPlusOneDay(firstDateTime);
  const yesterDay = getMinusOneDay(firstDateTime);

  const minusOneDay = () => {
    setReservationDate(getMinusOneDay(reservationDate));
  };

  const plusOneDay = () => {
    setReservationDate(getPlusOneDay(reservationDate));
  };

  return {
    reservationDate,
    setReservationDate,
    firstDateTime,
    lastDateTime,
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
