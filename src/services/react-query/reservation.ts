import { useUserState } from "@stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  CommonAPIError,
  KioskReservationRequestDTO,
  ReservationConfirmWithQRRequestDTO,
} from "@types";

import { APIResponse } from "../axiosService";
import { queryKeys } from "./queryKeys";
import {
  cancelReservation,
  fetchCurrentReservationList,
  fetchPastResetvationList,
  fetchPenaltyList,
  KioskReservation,
  reservationConfirmWithQR,
  reservationReturn,
} from "../api";
import { useModal } from "@/hooks/useModal";

export const useKioskReservation = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal("modal-kiosk-reservation-result");

  return useMutation<
    APIResponse<void>,
    CommonAPIError,
    KioskReservationRequestDTO
  >((data: KioskReservationRequestDTO) => KioskReservation(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.reservation]);
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 5000);
    },
    onError: () => {
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 5000);
    },
  });
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
  const { closeModal } = useModal("modal-reservation-confirm-result");

  return useMutation<
    APIResponse<void>,
    CommonAPIError,
    ReservationConfirmWithQRRequestDTO
  >(
    (data: ReservationConfirmWithQRRequestDTO) =>
      reservationConfirmWithQR(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.reservation]);
        setTimeout(() => {
          closeModal();
          window.location.reload();
        }, 5000);
      },
      onError: () => {
        setTimeout(() => {
          closeModal();
          window.location.reload();
        }, 5000);
      },
    },
  );
};

export const useFetchCurrentReservationList = () => {
  const { hasAuth } = useUserState();

  const { data, isLoading } = useQuery(
    [queryKeys.reservation, queryKeys.currentReservation],
    () => fetchCurrentReservationList(),
    { enabled: hasAuth, select: (data) => data.result },
  );

  return { data, isLoading };
};

export const useFetchPastReservationList = () => {
  const { hasAuth } = useUserState();

  const { data, isLoading } = useQuery(
    [queryKeys.user],
    () => fetchPastResetvationList(),
    { enabled: hasAuth, select: (data) => data.result },
  );

  return { data, isLoading };
};

export const useFetchPenaltyList = () => {
  const { hasAuth } = useUserState();

  const { data, isLoading } = useQuery(
    [queryKeys.user, queryKeys.penalty],
    () => fetchPenaltyList(),
    { enabled: hasAuth, select: (data) => data.result },
  );

  return { data, isLoading };
};

export const useReservationReturn = () => {
  const client = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    ({ reservationId, data }: { reservationId: number; data: FormData }) =>
      reservationReturn(reservationId, data),
    {
      onSuccess: (res) => {
        client.invalidateQueries([queryKeys.reservation]);
        navigate("/mypage");
        toast.success("반납완료");
      },
      onError: () => toast.error("반납에 실패했습니다"),
    },
  );
};
