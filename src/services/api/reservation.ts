import {
  CurrentResetvation,
  FetchReservationPeriod,
  KioskReservationRequestDTO,
  PastResetvation,
  Reservation,
  ReservationConfirmWithQRRequestDTO,
  ReservationRequestDTO,
} from "@types";
import { API_VERSION, HTTP_METHOD } from ".";
import { getJWTHeader, _axios } from "../axiosService";

const reservationURL = "reservations";

export const reservation = async (data: ReservationRequestDTO) => {
  return _axios<void>({
    url: `/${API_VERSION.v1}/${reservationURL}`,
    method: HTTP_METHOD.POST,
    headers: getJWTHeader(),
    data,
  });
};

export const KioskReservation = async (data: KioskReservationRequestDTO) => {
  return _axios<void>({
    url: `/${API_VERSION.v1}/${reservationURL}/onsite/qr`,
    method: HTTP_METHOD.POST,
    data,
  });
};

export const cancelReservation = async (reservationId: number) => {
  return _axios<void>({
    url: `/${API_VERSION.v1}/${reservationURL}/${reservationId}`,
    method: HTTP_METHOD.DELETE,
    headers: getJWTHeader(),
  });
};

export const reservationConfirmWithQR = async (
  data: ReservationConfirmWithQRRequestDTO,
) => {
  return _axios<void>({
    url: `/${API_VERSION.v1}/${reservationURL}/auth`,
    method: HTTP_METHOD.POST,
    data,
  });
};

export const reservationReturn = async (
  reservationId: number,
  cleanupPhoto: FormData,
) => {
  return _axios<void>({
    url: `/${API_VERSION.v1}/returns`,
    method: HTTP_METHOD.POST,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      reservationId,
    },
    data: cleanupPhoto,
  });
};

//프로젝트실별 예약내역 조회
export const fetchReservationListByProjectroomId = async (
  projectRoomId: number,
  period: FetchReservationPeriod,
) => {
  return _axios<Reservation[]>({
    url: `/${API_VERSION.v1}/${reservationURL}`,
    method: HTTP_METHOD.GET,
    params: { projectRoomId, ...period },
  });
};

//<----- 유저 예약 내역 조회 -----
export const fetchCurrentReservationList = async (memberId: number) => {
  return _axios<CurrentResetvation[]>({
    url: `/${API_VERSION.v1}/${reservationURL}/current`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
    params: { memberId },
  });
};

export const fetchPastResetvationList = async (memberId: number) => {
  return _axios<PastResetvation[]>({
    url: `/${API_VERSION.v1}/${reservationURL}/past`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
    params: { memberId },
  });
};

//----- 유저 예약 내역 조회 ----->
