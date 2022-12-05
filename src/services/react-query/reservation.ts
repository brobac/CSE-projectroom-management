import { useUserState } from "@stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CommonAPIError,
  KioskReservationRequestDTO,
  ReservationConfirmWithQRRequestDTO,
} from "@types";
import { toast } from "react-toastify";
import {
  cancelReservation,
  fetchCurrentReservationList,
  fetchPastResetvationList,
  KioskReservation,
  reservationConfirmWithQR,
} from "../api";
import { APIResponse } from "../axiosService";
import { queryKeys } from "./queryKeys";

export const useKioskReservation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    (data: KioskReservationRequestDTO) => KioskReservation(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.reservation]);
      },
    },
  );

  return { mutate, isLoading, isError };
};

export const useCancelReservation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation<
    APIResponse<void>,
    CommonAPIError,
    number
  >((reservationId: number) => cancelReservation(reservationId), {
    onSuccess: (res) => {
      queryClient.invalidateQueries([queryKeys.reservation]);
      toast.success(res.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading, isError };
};

export const useReservationConfirmWithQR = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    (reservationId: ReservationConfirmWithQRRequestDTO) =>
      reservationConfirmWithQR(reservationId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.reservation]);
      },
    },
  );

  return { mutate, isLoading, isError };
};

export const useFetchCurrentReservationList = () => {
  const { user, hasAuth } = useUserState();

  const { data, isLoading } = useQuery(
    [queryKeys.reservation, queryKeys.currentReservation],
    () => fetchCurrentReservationList(user?.memberId!),
    { enabled: hasAuth, select: (data) => data.result },
  );

  return { data, isLoading };
};

export const useFetchPastReservationList = () => {
  const { user, hasAuth } = useUserState();

  const { data, isLoading } = useQuery(
    [queryKeys.user, user?.memberId],
    () => fetchPastResetvationList(user?.memberId!),
    { enabled: hasAuth, select: (data) => data.result },
  );

  return { data, isLoading };
};
