import { RoomTableProps } from "@/pages/kiosk/kiosk-reservation/_roomTable";
import { queryKeys } from "@/services/react-query/queryKeys";
import {
  APIResponse,
  fetchReservationListByProjectroomId,
  reservation,
} from "@services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CommonAPIError,
  KioskReservationRequestDTO,
  ProjectRoom,
  Reservation,
  ReservationRequestDTO,
  TableDeactivation,
} from "@types";
import {
  getMinusOneDay,
  getPlusOneDay,
  isBefore,
  isBeforeHour,
  toFullDateTime_SLASH,
} from "@utils";
import dayjs from "dayjs";
import { toast } from "react-toastify";
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
          firstAt: toFullDateTime_SLASH(firstDateTime),
          lastAt: toFullDateTime_SLASH(lastDateTime),
        },
      ),
    {
      enabled: reservationProjectRoom !== undefined,
      keepPreviousData: true,
      onSuccess: (res) => {
        const { reservedList, tableDeactivationList } = res.result;
        const list = [...reservedList];
        tableDeactivationList.forEach((tableDeactivation) => {
          list.push(convertTableDeactivationToReservation(tableDeactivation));
        });

        setReservationList(list);
      },
    },
  );

  return { reservationList, isLoading };
};

const convertTableDeactivationToReservation = (
  data: TableDeactivation,
): Reservation => {
  return {
    startAt: data.startAt,
    endAt: data.endAt,
    projectTableId: data.projectTableId,
    reservationStatus: {
      status: "",
      statusCode: "",
    },
    returnedAt: null,
    tableName: data.tableName,
  };
};

// <----- 예약하기 위해 선택한 정보들 -----
export const reservationProjectRoomState = atom<ProjectRoom | undefined>({
  key: "reservationProjectRoomState",
  default: undefined,
});

export const reservationDateState = atom({
  key: "reservationDateState",
  default: isBefore(new Date(), dayjs().hour(7).minute(30).toDate())
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

export const reservationTableState = atom<number>({
  key: "reservationTableState",
  default: -1,
});

// ----- 예약하기 위해 선택한 정보들 ----->

export const useReservation = () => {
  const queryClient = useQueryClient();

  const reservationTableId = useRecoilValue(reservationTableState);
  const { startTime, endTime } = useReservationTimeState();

  const isValid = startTime && endTime && reservationTableId !== -1;

  const reservationData: ReservationRequestDTO = {
    endAt: toFullDateTime_SLASH(endTime!),
    startAt: toFullDateTime_SLASH(startTime!),
    projectTableId: reservationTableId,
  };

  const { mutate, isLoading, isError } = useMutation<
    APIResponse<void>,
    CommonAPIError
  >(() => reservation(reservationData), {
    onSuccess: (res) => {
      queryClient.invalidateQueries([queryKeys.reservation]);
      toast.success(res.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isLoading, isValid, isError };
};

export const returnReservationIdState = atom<number | null>({
  key: "returnReservationIdState",
  default: null,
});

export const qrScanResultState = atom<string>({
  key: "qrSanResultState",
  default: "",
});

export const kioskReservationTableState = atom<RoomTableProps | undefined>({
  key: "kioskReservationTableState",
  default: undefined,
});

export const kioskReservationState = atom<
  KioskReservationRequestDTO | undefined
>({ key: "kioskReservationState", default: undefined });

export const useKioskReservationState = () => {
  const [state, setState] = useRecoilState(kioskReservationState);

  const isValid =
    state?.accountQRContents &&
    state?.projectTableId &&
    state.startAt &&
    state.endAt;

  return { state, setState, isValid };
};
