declare module "@types" {
  type ReservationStateType =
    | "예약완료"
    | "취소됨"
    | "사용중"
    | "미사용"
    | "반납 대기중"
    | "미반납"
    | "반납 완료";

  type Reservation = {
    tableName: string;
    projectTableId: number;
    startDateTime: DateValue;
    endDateTime: DateValue;
    returnedDateTime: DateValue | null;
  };

  type ReservationRequestDTO = {
    endDateTime: DateValue;
    startDateTime: DateValue;
    projectTableId: number;
    memberId: number;
  };

  type KioskReservationRequestDTO = {
    endDateTime: DateValue;
    startDateTime: DateValue;
    projectTableId: number;
    accountQRContents: string;
  };

  type ReservationConfirmWithQRRequestDTO = { qrContent: string };

  type FetchReservationPeriod = {
    firstDateTime: DateValue;
    lastDateTime: DateValue;
  };

  type ReservationStatus = {
    status: string;
    statusCode: string;
  };

  type CurrentResetvation = {
    startDateTime: DateValue;
    endDateTime: DateValue;
    imageName: string;
    imageURL: string;
    reservationId: number;
    reservationStatus: ReservationStatus;
    roomName: string;
    tableName;
  };

  type PastResetvation = {
    startDateTime: DateValue;
    endDateTime: DateValue;
    reservationId: number;
    reservationStatus: ReservationStatus;
    roomName: string;
    tableName;
  };
}
