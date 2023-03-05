export * from "./LoginModal";
export * from "./ReservationDatePickerModal";
export * from "./MyQRCode";

export const MODAL_TYPE = {
  LOGIN: "modal-login",
  RESERVAION_DATE_PICKER: "modal-reservation-date-picker",
  QR_CODE: "modal-qrcode",
  RESERVATION_CONFIRM_RESULT: "modal-reservation-confirm-result",
  KIOSK_RESERVATION_RESULT: "modal-kiosk-reservation-result",
  ADMIN_RESERVATION: "modal-admin-reservation",
} as const;
