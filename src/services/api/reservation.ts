import {
  KioskReservationRequestDTO,
  ReservationConfirmWithQRRequestDTO,
  ReservationRequestDTO,
} from "@types";
import { HTTP_METHOD } from ".";
import { getJWTHeader, _axios } from "../axiosService";

const reservationURL = "/reservations";

export const reservation = async (data: ReservationRequestDTO) => {
  return _axios<void>({
    url: `${reservationURL}`,
    method: HTTP_METHOD.POST,
    headers: getJWTHeader(),
    data,
  });
};

export const KioskReservation = async (data: KioskReservationRequestDTO) => {
  return _axios<void>({
    url: `${reservationURL}/onsite`,
    method: HTTP_METHOD.POST,
    data,
  });
};

export const cancelReservation = async (reservationId: number) => {
  return _axios<void>({
    url: `${reservationURL}/${reservationId}`,
    method: HTTP_METHOD.PATCH,
    headers: getJWTHeader(),
  });
};

export const reservationConfirmWithQR = async (
  data: ReservationConfirmWithQRRequestDTO,
) => {
  return _axios<void>({
    url: `${reservationURL}/auth/qr`,
    method: HTTP_METHOD.PATCH,
    data,
  });
};
