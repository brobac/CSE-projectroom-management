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
    startAt: DateValue;
    endAt: DateValue;
    returnedAt: DateValue | null;
  }

  interface ReservationRequestDTO {
    endAt: DateValue;
    startAt: DateValue;
    projectTableId: number;
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
    startAt: DateValue;
    endAt: DateValue;
    imageName: string;
    imageURL: string;
    reservationId: number;
    reservationStatus: ReservationStatus;
    roomName: string;
    tableName;
  }
  interface PastResetvation {
    startAt: DateValue;
    endAt: DateValue;
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
    cleanUpPhoto: Image;
    returnedAt: string;
    tableReturnId: number;
  }
}
