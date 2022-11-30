import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  KioskReservationRequestDTO,
  ReservationConfirmWithQRRequestDTO,
  ReservationRequestDTO,
} from "@types";
import {
  cancelReservation,
  KioskReservation,
  reservation,
  reservationConfirmWithQR,
} from "../api";
import { queryKeys } from "./queryKeys";

export const useReservation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    (data: ReservationRequestDTO) => reservation(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.reservation]);
      },
    },
  );

  return { mutate, isLoading, isError };
};

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

  const { mutate, isLoading, isError } = useMutation(
    (reservationId: number) => cancelReservation(reservationId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.reservation]);
      },
    },
  );

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
