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

const reservationURL = "reservations";
const versionURL = "v1";

export const reservation = async (data: ReservationRequestDTO) => {
  return _axios<void>({
    url: `/${versionURL}/${reservationURL}`,
    method: HTTP_METHOD.POST,
    headers: getJWTHeader(),
    data,
  });
};

export const KioskReservation = async (data: KioskReservationRequestDTO) => {
  return _axios<void>({
    url: `/${versionURL}/${reservationURL}/onsite/qr`,
    method: HTTP_METHOD.POST,
    data,
  });
};

export const cancelReservation = async (reservationId: number) => {
  return _axios<void>({
    url: `/${versionURL}/${reservationURL}/${reservationId}`,
    method: HTTP_METHOD.DELETE,
    headers: getJWTHeader(),
  });
};

export const reservationConfirmWithQR = async (
  data: ReservationConfirmWithQRRequestDTO,
) => {
  return _axios<void>({
    url: `/${versionURL}/${reservationURL}/auth`,
    method: HTTP_METHOD.PATCH,
    data,
  });
};

export const reservationReturn = async (
  reservationId: number,
  cleanupPhoto: FormData,
) => {
  return _axios<void>({
    url: `/${versionURL}/returns`,
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
    url: `/${versionURL}/${reservationURL}`,
    method: HTTP_METHOD.GET,
    params: { projectRoomId, ...period },
  });
};

//<----- 유저 예약 내역 조회 -----
export const fetchCurrentReservationList = async (memberId: number) => {
  return _axios<CurrentResetvation[]>({
    url: `/${versionURL}/${reservationURL}/current`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
    params: { memberId },
  });
};

export const fetchPastResetvationList = async (memberId: number) => {
  return _axios<PastResetvation[]>({
    url: `/${versionURL}/${reservationURL}/past`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
    params: { memberId },
  });
};

//----- 유저 예약 내역 조회 ----->
