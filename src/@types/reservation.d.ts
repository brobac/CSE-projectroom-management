declare module "@types" {
  type ReservationStateType =
    | "예약완료"
    | "취소됨"
    | "사용중"
    | "미사용"
    | "반납 대기중"
    | "미반납"
    | "반납 완료";
}