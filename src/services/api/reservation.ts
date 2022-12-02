import {
  CurrentResetvation,
  FetchReservationPeriod,
  KioskReservationRequestDTO,
  PastResetvation,
  Reservation,
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

//프로젝트실별 예약내역 조회
export const fetchReservationListByProjectroomId = async (
  id: number,
  period: FetchReservationPeriod,
) => {
  return _axios<Reservation[]>({
    url: `${reservationURL}/projectrooms/${id}`,
    method: HTTP_METHOD.GET,
    params: { ...period },
  });
};

//<----- 유저 예약 내역 조회 -----
export const fetchCurrentReservationList = async (userId: number) => {
  return _axios<CurrentResetvation[]>({
    url: `${reservationURL}/current/members/${userId}`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
  });
};

export const fetchPastResetvationList = async (userId: number) => {
  return _axios<PastResetvation[]>({
    url: `${reservationURL}/past/members/${userId}`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
  });
};

//----- 유저 예약 내역 조회 ----->
