declare module "@types" {
  type ReservationStateType =
    | "예약완료"
    | "취소됨"
    | "사용중"
    | "미사용"
    | "반납 대기중"
    | "미반납"
    | "반납 완료";

  interface Reservation {
    tableName: string;
    projectTableId: number;
    startDateTime: DateValue;
    endDateTime: DateValue;
    returnedDateTime: DateValue | null;
  }

  interface ReservationRequestDTO {
    endAt: DateValue;
    startAt: DateValue;
    projectTableId: number;
    memberId: number;
  }

  interface KioskReservationRequestDTO {
    endAt: DateValue;
    startAt: DateValue;
    projectTableId: number;
    accountQRContents: string;
  }

  interface ReservationConfirmWithQRRequestDTO {
    qrContent: string;
  }

  interface FetchReservationPeriod {
    firstAt: DateValue;
    lastAt: DateValue;
  }

  interface ReservationStatus {
    status: string;
    statusCode: string;
  }
  interface CurrentResetvation {
    startDateTime: DateValue;
    endDateTime: DateValue;
    imageName: string;
    imageURL: string;
    reservationId: number;
    reservationStatus: ReservationStatus;
    roomName: string;
    tableName;
  }
  interface PastResetvation {
    startDateTime: DateValue;
    endDateTime: DateValue;
    reservationId: number;
    reservationStatus: ReservationStatus;
    roomName: string;
    tableName;
  }

  interface ReservationReturnDTO {
    cleanUpPhoto: File;
    reservationId: number;
  }

  interface AdminReservationDTO {
    member: MemberSimpleInfo;
    reservation: ReservationSimpleInfo;
    tableReturn: ReservationReturnSimpleInfo;
  }

  interface FetchAdminReservationListOptions {
    pageNumber?: number;
    size?: number;
    offset?: number;
    stardDt?: DateValue;
    endDt?: DateValue;
    loginId?: number;
    memberName?: number;
    reservationStatus?: ReservationStateType;
    roomName?: string;
  }

  interface ReservationSimpleInfo {
    startAt: DateValue;
    endAt: DateValue;
    reservationId: number;
    reservationStatus: ReservationStatus;
    roomName: string;
    tableName: string;
  }

  interface Image {
    fileLocalName: string;
    fileOriName: string;
    fileUrl: string;
  }

  interface ReservationReturnSimpleInfo {
    cleanupPhoto: Image;
    returnAt: string;
    tableReturnId: number;
  }
}
